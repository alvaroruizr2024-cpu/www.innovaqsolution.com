#!/usr/bin/env bash
# Ruta C de video-to-skill: convierte un video local en material que Claude puede leer.
#   sheet.jpg        mosaico de fotogramas (uno cada 3 s)
#   capsheet_N.jpg   tiras con la franja de subtítulos incrustados (2 fps)
#   audio.wav        mono 16 kHz para Whisper
#   transcript.txt   solo si faster-whisper puede descargar su modelo
#
# Uso: extract_local_video.sh <video> <carpeta_salida> [--cap-y 620] [--cap-h 120] [--fps-cap 2] [--every 3] [--no-whisper]
set -euo pipefail

VIDEO="${1:-}"; OUT="${2:-}"
[[ -z "$VIDEO" || -z "$OUT" ]] && { echo "Uso: $0 <video> <carpeta_salida> [opciones]" >&2; exit 2; }
[[ -f "$VIDEO" ]] || { echo "No existe el video: $VIDEO" >&2; exit 2; }
shift 2

CAP_Y=620; CAP_H=120; FPS_CAP=2; EVERY=3; WHISPER=1
while [[ $# -gt 0 ]]; do
  case "$1" in
    --cap-y) CAP_Y="$2"; shift 2;;
    --cap-h) CAP_H="$2"; shift 2;;
    --fps-cap) FPS_CAP="$2"; shift 2;;
    --every) EVERY="$2"; shift 2;;
    --no-whisper) WHISPER=0; shift;;
    *) echo "Opción desconocida: $1" >&2; exit 2;;
  esac
done

# 1. ffmpeg: $FFMPEG, el del sistema, o el estático de imageio-ffmpeg (PyPI).
find_ffmpeg() {
  if [[ -n "${FFMPEG:-}" && -x "$FFMPEG" ]]; then echo "$FFMPEG"; return; fi
  if command -v ffmpeg >/dev/null 2>&1; then command -v ffmpeg; return; fi
  python3 -c "import imageio_ffmpeg" 2>/dev/null || pip install -q imageio-ffmpeg >/dev/null 2>&1 || true
  python3 -c "import imageio_ffmpeg,sys; sys.stdout.write(imageio_ffmpeg.get_ffmpeg_exe())" 2>/dev/null || true
}
FF="$(find_ffmpeg)"
[[ -n "$FF" && -x "$FF" ]] || { echo "No hay ffmpeg utilizable (prueba: pip install imageio-ffmpeg)" >&2; exit 1; }

mkdir -p "$OUT/frames" "$OUT/cap"
echo "ffmpeg: $FF"
"$FF" -i "$VIDEO" 2>&1 | grep -E "Duration|Stream" | tee "$OUT/meta.txt" || true

# 2. Mosaico de fotogramas.
"$FF" -y -loglevel error -i "$VIDEO" -vf "fps=1/${EVERY},scale=640:-1" "$OUT/frames/f_%03d.jpg"
N=$(ls "$OUT/frames" | wc -l)
ROWS=$(( (N + 5) / 6 )); [[ $ROWS -lt 1 ]] && ROWS=1
"$FF" -y -loglevel error -i "$OUT/frames/f_%03d.jpg" -filter_complex "tile=6x${ROWS}" -frames:v 1 "$OUT/sheet.jpg"
echo "fotogramas: $N (uno cada ${EVERY}s) -> $OUT/sheet.jpg"

# 3. Tiras de subtítulos incrustados.
"$FF" -y -loglevel error -i "$VIDEO" -vf "fps=${FPS_CAP},crop=iw:${CAP_H}:0:${CAP_Y}" "$OUT/cap/c_%03d.jpg"
C=$(ls "$OUT/cap" | wc -l)
PER=36; i=0; s=1
while [[ $s -le $C ]]; do
  "$FF" -y -loglevel error -start_number "$s" -i "$OUT/cap/c_%03d.jpg" -frames:v 1 -filter_complex "tile=2x18" "$OUT/capsheet_${i}.jpg"
  i=$((i+1)); s=$((s+PER))
done
echo "tiras de subtítulos: $C recortes a ${FPS_CAP} fps -> $OUT/capsheet_0..$((i-1)).jpg (franja y=${CAP_Y} h=${CAP_H})"

# 4. Audio para Whisper.
if "$FF" -y -loglevel error -i "$VIDEO" -vn -ac 1 -ar 16000 "$OUT/audio.wav" 2>/dev/null; then
  echo "audio: $OUT/audio.wav"
else
  echo "audio: el video no tiene pista de audio"
fi

# 5. Transcripción, si se puede.
if [[ $WHISPER -eq 1 && -f "$OUT/audio.wav" ]]; then
  python3 - "$OUT" <<'PY' || echo "transcript: no disponible (faster-whisper no instalado o modelo no descargable); lee capsheet_*.jpg"
import sys, os
out = sys.argv[1]
try:
    from faster_whisper import WhisperModel
except ImportError:
    import subprocess
    subprocess.run([sys.executable, "-m", "pip", "install", "-q", "faster-whisper"], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    from faster_whisper import WhisperModel
m = WhisperModel("small", device="cpu", compute_type="int8")
segs, info = m.transcribe(os.path.join(out, "audio.wav"), vad_filter=True)
with open(os.path.join(out, "transcript.txt"), "w") as f:
    f.write(f"# idioma {info.language} ({info.language_probability:.2f})\n")
    for s in segs:
        f.write(f"[{s.start:6.1f}-{s.end:6.1f}] {s.text.strip()}\n")
print("transcript:", os.path.join(out, "transcript.txt"))
PY
fi

echo "Listo. Lee $OUT/sheet.jpg y $OUT/capsheet_*.jpg con Read y reconstruye el guion en orden."

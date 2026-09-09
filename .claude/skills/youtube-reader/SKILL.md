---
name: youtube-reader
description: "Use this skill whenever the user pastes a YouTube link (youtube.com/watch, youtube.com/live, youtu.be, shorts) and asks Claude to read, watch, summarize, transcribe, resume, or extract information from the video, or types /youtube-reader <url>. Claude cannot play video, but it CAN read a YouTube video through its captions/transcript plus metadata (title, channel, date, description, chapters). Trigger on phrases like 'lee este video', 'resume este video de YouTube', 'qué dice el video', 'transcribe', 'saca los puntos clave', or any request that needs the spoken content of a YouTube video. Always use this skill instead of guessing from the URL or refusing."
---

# YouTube Reader

Claude cannot watch a YouTube video, but it can reliably "read" one from two
sources that YouTube exposes as text:

1. **Captions / transcript** (manual or auto-generated), fetched with
   `youtube-transcript-api`, with `yt-dlp` as a fallback.
2. **Metadata**: title, channel, publish date, duration, description and
   chapters, fetched with `yt-dlp`.

The bundled script does all of that in one call and writes a Markdown file that
Claude then reads and summarizes.

## When to use this

- The user pastes a YouTube URL and wants a summary, key points, action items,
  quotes, timestamps, or a full transcript.
- The user invokes `/youtube-reader <url>`.
- Do NOT use this for local video files or Google Drive footage; use
  `video-reader` for those.

## Core workflow

### 1. Install dependencies (once per session)

```bash
pip install -q yt-dlp youtube-transcript-api
```

### 2. Run the reader

```bash
python3 .claude/skills/youtube-reader/scripts/youtube_reader.py "<url>" \
  --out-dir /tmp/youtube-reader --langs es,en
```

Outputs, inside `--out-dir`:

- `<video_id>.json`: metadata plus the raw transcript segments with timestamps.
- `<video_id>.md`: a readable document (metadata header, description, chapters,
  transcript grouped in ~60-second blocks with `[mm:ss]` markers).

The script prints a short JSON status to stdout with `status`, `title`,
`transcript_source` and `output_md`. Read `output_md` with the Read tool.

`--langs` is the preferred caption language order. Default is `es,en`. The
script falls back to any available language and to auto-generated captions,
and says which one it used.

### 3. Synthesize

Answer in the user's language (usually Spanish). A good default structure:

- **Datos del video**: título, canal, fecha, duración.
- **Resumen** en 3–6 frases.
- **Puntos clave** con marcas de tiempo `[mm:ss]` para que el usuario pueda
  saltar al momento exacto.
- **Acciones / conclusiones** si el video las tiene (charlas, capacitaciones,
  webinars).

Quote the transcript when the exact wording matters. Say plainly when the
transcript is auto-generated, because names, numbers and technical terms can be
mis-transcribed.

### 4. If the transcript is missing

Some videos have captions disabled, and live streams may take hours after the
stream ends before auto-captions exist. In that case the script still returns
the metadata and the description. Report what is available, state that the
spoken content could not be read, and offer:

- retrying later (for a recent live stream), or
- downloading the audio with `yt-dlp -x` for the user to transcribe elsewhere.

## Network requirement (important on Claude Code on the web)

This skill needs outbound access to `youtube.com`. The default network policy
of a Claude Code web environment only allows package registries, and every
request to YouTube fails with a proxy 403. The script detects that and exits
with `status: "network_blocked"`.

When that happens, tell the user exactly this:

1. Open the environment settings at https://claude.ai/code (Environments).
2. Set the network policy to allow **youtube.com**, **www.youtube.com**,
   **youtu.be**, **googlevideo.com** and **i.ytimg.com** (or use the unrestricted
   policy).
3. Start a new session and rerun `/youtube-reader <url>`.

Do not try third-party mirrors (Invidious, Piped, jina, noembed): they are
blocked by the same policy. Do not present a result from an external "video
analysis" service as the video's content unless it demonstrably downloaded
this video; generic scene descriptions are not evidence.

## Gotchas

- `youtube.com/live/<id>` URLs are live-stream permalinks. The script normalizes
  them to the video id; the recording is readable only after the stream ends
  and YouTube finishes processing it.
- Transcript segments from auto-captions have no punctuation. Group them by
  time, not by sentence.
- Very long videos (2h+) produce large transcripts. Summarize per chapter or per
  30-minute block instead of reading the whole file into context at once; the
  `.md` file has `[mm:ss]` markers to navigate.
- Keep the `--out-dir` in the scratchpad or `/tmp`; never commit transcripts
  into the repo unless the user asks for it.

/**
 * Acceso al vault de Obsidian por sistema de archivos.
 *
 * Un vault es simplemente una carpeta con archivos Markdown. Este módulo
 * centraliza: resolución segura de rutas, lectura/escritura de notas,
 * parseo de frontmatter YAML, extracción de wikilinks y etiquetas, y un
 * índice ligero en memoria para búsquedas y backlinks.
 */

import { promises as fs } from "node:fs";
import * as path from "node:path";
import YAML from "yaml";
import { IGNORED_DIRS, NOTE_EXT, TRASH_DIR } from "./constants.js";

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export type Frontmatter = Record<string, unknown>;

export interface NoteMeta {
  /** Ruta relativa al vault, con extensión .md y separadores "/" */
  path: string;
  /** Nombre sin extensión (lo que Obsidian muestra) */
  name: string;
  /** Carpeta contenedora relativa al vault ("" si está en la raíz) */
  folder: string;
  size: number;
  modified: string;
  created: string;
}

export interface ParsedNote {
  frontmatter: Frontmatter;
  /** Cuerpo sin el bloque de frontmatter */
  body: string;
  /** true si el archivo tenía bloque frontmatter */
  hasFrontmatter: boolean;
}

export interface WikiLink {
  /** Destino tal como aparece en el enlace (sin alias ni #heading) */
  target: string;
  heading?: string;
  alias?: string;
  /** Ruta resuelta dentro del vault, o null si el enlace está roto */
  resolved: string | null;
}

export interface Note extends NoteMeta, ParsedNote {
  content: string;
  tags: string[];
  links: WikiLink[];
}

export class VaultError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "VaultError";
  }
}

// ---------------------------------------------------------------------------
// Vault
// ---------------------------------------------------------------------------

export class Vault {
  readonly root: string;

  constructor(root: string) {
    this.root = path.resolve(root);
  }

  static async open(root: string): Promise<Vault> {
    const vault = new Vault(root);
    let stat;
    try {
      stat = await fs.stat(vault.root);
    } catch {
      throw new VaultError(
        `La ruta del vault no existe: ${vault.root}. ` +
          `Define OBSIDIAN_VAULT_PATH apuntando a la carpeta del vault.`
      );
    }
    if (!stat.isDirectory()) {
      throw new VaultError(`La ruta del vault no es una carpeta: ${vault.root}`);
    }
    return vault;
  }

  // ---- Rutas ---------------------------------------------------------------

  /**
   * Normaliza una ruta de nota relativa al vault: separadores "/", sin "./",
   * y con extensión .md añadida si falta. Rechaza salidas del vault.
   */
  normalizeNotePath(input: string): string {
    let p = input.trim().replace(/\\/g, "/").replace(/^\/+/, "");
    if (p === "") throw new VaultError("La ruta de la nota no puede estar vacía.");
    if (!p.toLowerCase().endsWith(NOTE_EXT)) p += NOTE_EXT;
    const normalized = path.posix.normalize(p);
    if (normalized.startsWith("../") || normalized === ".." || path.posix.isAbsolute(normalized)) {
      throw new VaultError(`Ruta inválida (sale del vault): ${input}`);
    }
    const first = normalized.split("/")[0];
    if (first === ".obsidian") {
      throw new VaultError("No se permite operar sobre la carpeta de configuración .obsidian.");
    }
    return normalized;
  }

  normalizeFolder(input: string | undefined): string {
    if (!input) return "";
    const p = path.posix.normalize(input.trim().replace(/\\/g, "/").replace(/^\/+|\/+$/g, ""));
    if (p === "." || p === "") return "";
    if (p.startsWith("../") || p === "..") {
      throw new VaultError(`Carpeta inválida (sale del vault): ${input}`);
    }
    return p;
  }

  /** Ruta absoluta en disco, garantizando que queda dentro del vault. */
  absolute(relative: string): string {
    const abs = path.resolve(this.root, relative);
    const rel = path.relative(this.root, abs);
    if (rel.startsWith("..") || path.isAbsolute(rel)) {
      throw new VaultError(`Ruta fuera del vault: ${relative}`);
    }
    return abs;
  }

  // ---- Listado --------------------------------------------------------------

  /** Recorre el vault y devuelve metadatos de todas las notas .md. */
  async listNotes(folder = "", recursive = true): Promise<NoteMeta[]> {
    const start = this.normalizeFolder(folder);
    const startAbs = this.absolute(start || ".");
    try {
      const st = await fs.stat(startAbs);
      if (!st.isDirectory()) throw new VaultError(`No es una carpeta: ${start}`);
    } catch (e) {
      if (e instanceof VaultError) throw e;
      throw new VaultError(`La carpeta no existe en el vault: ${start || "/"}`);
    }

    const out: NoteMeta[] = [];
    const walk = async (relDir: string): Promise<void> => {
      const entries = await fs.readdir(this.absolute(relDir || "."), { withFileTypes: true });
      for (const entry of entries) {
        if (IGNORED_DIRS.has(entry.name) || entry.name.startsWith(".")) continue;
        const rel = relDir ? `${relDir}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
          if (recursive) await walk(rel);
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith(NOTE_EXT)) {
          out.push(await this.statNote(rel));
        }
      }
    };
    await walk(start);
    out.sort((a, b) => a.path.localeCompare(b.path));
    return out;
  }

  async listFolders(folder = ""): Promise<string[]> {
    const start = this.normalizeFolder(folder);
    const out: string[] = [];
    const walk = async (relDir: string): Promise<void> => {
      const entries = await fs.readdir(this.absolute(relDir || "."), { withFileTypes: true });
      for (const entry of entries) {
        if (!entry.isDirectory() || IGNORED_DIRS.has(entry.name) || entry.name.startsWith(".")) continue;
        const rel = relDir ? `${relDir}/${entry.name}` : entry.name;
        out.push(rel);
        await walk(rel);
      }
    };
    await walk(start);
    return out.sort();
  }

  async statNote(relPath: string): Promise<NoteMeta> {
    const st = await fs.stat(this.absolute(relPath));
    return {
      path: relPath,
      name: path.posix.basename(relPath, NOTE_EXT),
      folder: path.posix.dirname(relPath) === "." ? "" : path.posix.dirname(relPath),
      size: st.size,
      modified: st.mtime.toISOString(),
      created: st.birthtime.toISOString(),
    };
  }

  async exists(relPath: string): Promise<boolean> {
    try {
      await fs.access(this.absolute(relPath));
      return true;
    } catch {
      return false;
    }
  }

  // ---- Lectura / escritura --------------------------------------------------

  async readRaw(notePath: string): Promise<string> {
    const rel = this.normalizeNotePath(notePath);
    try {
      return await fs.readFile(this.absolute(rel), "utf8");
    } catch (e) {
      const code = (e as NodeJS.ErrnoException).code;
      if (code === "ENOENT") {
        throw new VaultError(
          `La nota no existe: ${rel}. Usa obsidian_search_notes o obsidian_list_notes para encontrar la ruta correcta.`
        );
      }
      throw e;
    }
  }

  async readNote(notePath: string): Promise<Note> {
    const rel = this.normalizeNotePath(notePath);
    const content = await this.readRaw(rel);
    const meta = await this.statNote(rel);
    const parsed = parseFrontmatter(content);
    const index = await this.index();
    return {
      ...meta,
      ...parsed,
      content,
      tags: extractTags(parsed),
      links: extractLinks(parsed.body).map((l) => ({ ...l, resolved: index.resolve(l.target, rel) })),
    };
  }

  async writeRaw(notePath: string, content: string): Promise<string> {
    const rel = this.normalizeNotePath(notePath);
    const abs = this.absolute(rel);
    await fs.mkdir(path.dirname(abs), { recursive: true });
    await fs.writeFile(abs, content, "utf8");
    this.invalidate();
    return rel;
  }

  async deleteNote(notePath: string, permanent: boolean): Promise<{ path: string; trashed_to?: string }> {
    const rel = this.normalizeNotePath(notePath);
    if (!(await this.exists(rel))) throw new VaultError(`La nota no existe: ${rel}`);
    if (permanent) {
      await fs.unlink(this.absolute(rel));
      this.invalidate();
      return { path: rel };
    }
    const trashRel = `${TRASH_DIR}/${rel}`;
    const trashAbs = this.absolute(trashRel);
    await fs.mkdir(path.dirname(trashAbs), { recursive: true });
    await fs.rename(this.absolute(rel), trashAbs);
    this.invalidate();
    return { path: rel, trashed_to: trashRel };
  }

  async moveNote(from: string, to: string, overwrite: boolean): Promise<{ from: string; to: string }> {
    const relFrom = this.normalizeNotePath(from);
    const relTo = this.normalizeNotePath(to);
    if (!(await this.exists(relFrom))) throw new VaultError(`La nota origen no existe: ${relFrom}`);
    if (relFrom === relTo) throw new VaultError("Origen y destino son la misma ruta.");
    if (!overwrite && (await this.exists(relTo))) {
      throw new VaultError(`Ya existe una nota en el destino: ${relTo}. Usa overwrite=true para reemplazarla.`);
    }
    const absTo = this.absolute(relTo);
    await fs.mkdir(path.dirname(absTo), { recursive: true });
    await fs.rename(this.absolute(relFrom), absTo);
    this.invalidate();
    return { from: relFrom, to: relTo };
  }

  // ---- Configuración de Obsidian -------------------------------------------

  /** Lee un JSON de .obsidian/ si existe (p. ej. daily-notes.json). */
  async readObsidianConfig<T = Record<string, unknown>>(file: string): Promise<T | null> {
    try {
      const raw = await fs.readFile(path.join(this.root, ".obsidian", file), "utf8");
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }

  // ---- Índice ---------------------------------------------------------------

  private _index: VaultIndex | null = null;
  private _indexBuiltAt = 0;
  private static readonly INDEX_TTL_MS = 5000;

  invalidate(): void {
    this._index = null;
  }

  /** Índice de todas las notas (contenido, tags, enlaces). Cacheado brevemente. */
  async index(): Promise<VaultIndex> {
    const now = Date.now();
    if (this._index && now - this._indexBuiltAt < Vault.INDEX_TTL_MS) return this._index;
    const metas = await this.listNotes("", true);
    const entries: IndexedNote[] = [];
    for (const meta of metas) {
      let content = "";
      try {
        content = await fs.readFile(this.absolute(meta.path), "utf8");
      } catch {
        continue;
      }
      const parsed = parseFrontmatter(content);
      entries.push({
        ...meta,
        ...parsed,
        content,
        tags: extractTags(parsed),
        rawLinks: extractLinks(parsed.body),
      });
    }
    this._index = new VaultIndex(entries);
    this._indexBuiltAt = now;
    return this._index;
  }
}

// ---------------------------------------------------------------------------
// Índice en memoria
// ---------------------------------------------------------------------------

export interface IndexedNote extends NoteMeta, ParsedNote {
  content: string;
  tags: string[];
  rawLinks: Omit<WikiLink, "resolved">[];
}

export class VaultIndex {
  readonly notes: IndexedNote[];
  private readonly byPath = new Map<string, IndexedNote>();
  private readonly byName = new Map<string, IndexedNote[]>();

  constructor(notes: IndexedNote[]) {
    this.notes = notes;
    for (const n of notes) {
      this.byPath.set(n.path.toLowerCase(), n);
      const key = n.name.toLowerCase();
      const arr = this.byName.get(key) ?? [];
      arr.push(n);
      this.byName.set(key, arr);
    }
  }

  get(notePath: string): IndexedNote | undefined {
    return this.byPath.get(notePath.toLowerCase());
  }

  /**
   * Resuelve un destino de wikilink a una ruta del vault, imitando a Obsidian:
   * 1) ruta exacta (con o sin .md), 2) misma carpeta que la nota origen,
   * 3) nombre único en cualquier carpeta (el primero por orden alfabético).
   */
  resolve(target: string, fromPath?: string): string | null {
    const clean = target.trim().replace(/\\/g, "/").replace(/^\/+/, "");
    if (!clean) return null;
    const withExt = clean.toLowerCase().endsWith(NOTE_EXT) ? clean : clean + NOTE_EXT;
    const exact = this.byPath.get(withExt.toLowerCase());
    if (exact) return exact.path;

    const base = path.posix.basename(clean, NOTE_EXT).toLowerCase();
    const candidates = this.byName.get(base);
    if (!candidates || candidates.length === 0) return null;
    if (fromPath) {
      const folder = path.posix.dirname(fromPath);
      const sibling = candidates.find((c) => path.posix.dirname(c.path) === folder);
      if (sibling) return sibling.path;
    }
    return candidates[0].path;
  }

  backlinks(notePath: string): { source: string; links: Omit<WikiLink, "resolved">[] }[] {
    const target = notePath.toLowerCase();
    const out: { source: string; links: Omit<WikiLink, "resolved">[] }[] = [];
    for (const n of this.notes) {
      const hits = n.rawLinks.filter((l) => (this.resolve(l.target, n.path) ?? "").toLowerCase() === target);
      if (hits.length) out.push({ source: n.path, links: hits });
    }
    return out;
  }

  tagCounts(): Map<string, number> {
    const counts = new Map<string, number>();
    for (const n of this.notes) {
      for (const t of new Set(n.tags)) counts.set(t, (counts.get(t) ?? 0) + 1);
    }
    return counts;
  }
}

// ---------------------------------------------------------------------------
// Frontmatter
// ---------------------------------------------------------------------------

const FM_RE = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/;

export function parseFrontmatter(content: string): ParsedNote {
  const m = content.match(FM_RE);
  if (!m) return { frontmatter: {}, body: content, hasFrontmatter: false };
  let data: unknown = {};
  try {
    data = YAML.parse(m[1]) ?? {};
  } catch {
    data = {};
  }
  const frontmatter = typeof data === "object" && data !== null && !Array.isArray(data) ? (data as Frontmatter) : {};
  return { frontmatter, body: content.slice(m[0].length), hasFrontmatter: true };
}

export function serializeNote(frontmatter: Frontmatter, body: string): string {
  const keys = Object.keys(frontmatter);
  if (keys.length === 0) return body;
  const yaml = YAML.stringify(frontmatter).trimEnd();
  return `---\n${yaml}\n---\n${body}`;
}

// ---------------------------------------------------------------------------
// Enlaces y etiquetas
// ---------------------------------------------------------------------------

const WIKILINK_RE = /(?<!\!)\[\[([^\]\|#]+)(?:#([^\]\|]+))?(?:\|([^\]]+))?\]\]/g;

export function extractLinks(body: string): Omit<WikiLink, "resolved">[] {
  const out: Omit<WikiLink, "resolved">[] = [];
  const stripped = stripCode(body);
  for (const m of stripped.matchAll(WIKILINK_RE)) {
    const link: Omit<WikiLink, "resolved"> = { target: m[1].trim() };
    if (m[2]) link.heading = m[2].trim();
    if (m[3]) link.alias = m[3].trim();
    out.push(link);
  }
  return out;
}

const INLINE_TAG_RE = /(?:^|[\s(\[,])#([\p{L}\p{N}_\/-]*[\p{L}_\/-][\p{L}\p{N}_\/-]*)/gu;

export function extractTags(parsed: ParsedNote): string[] {
  const tags = new Set<string>();
  const fmTags = parsed.frontmatter["tags"] ?? parsed.frontmatter["tag"];
  const addFm = (v: unknown): void => {
    if (typeof v === "string") {
      v.split(/[,\s]+/).filter(Boolean).forEach((t) => tags.add(t.replace(/^#/, "")));
    } else if (Array.isArray(v)) {
      v.forEach(addFm);
    }
  };
  addFm(fmTags);
  for (const m of stripCode(parsed.body).matchAll(INLINE_TAG_RE)) tags.add(m[1]);
  return [...tags].sort();
}

/** Elimina bloques de código (``` ```) y código inline para no confundir tags/links. */
function stripCode(text: string): string {
  return text.replace(/```[\s\S]*?```/g, "").replace(/`[^`\n]*`/g, "");
}

// ---------------------------------------------------------------------------
// Utilidades
// ---------------------------------------------------------------------------

/** Formatea una fecha con tokens tipo moment usados por Obsidian (YYYY, MM, DD, ...). */
export function formatDate(date: Date, format: string): string {
  const pad = (n: number, w = 2): string => String(n).padStart(w, "0");
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const tokens: Record<string, string> = {
    YYYY: String(date.getFullYear()),
    YY: String(date.getFullYear()).slice(-2),
    MMMM: months[date.getMonth()],
    MMM: months[date.getMonth()].slice(0, 3),
    MM: pad(date.getMonth() + 1),
    M: String(date.getMonth() + 1),
    DDDD: String(dayOfYear(date)),
    DD: pad(date.getDate()),
    D: String(date.getDate()),
    dddd: days[date.getDay()],
    ddd: days[date.getDay()].slice(0, 3),
    HH: pad(date.getHours()),
    mm: pad(date.getMinutes()),
    ss: pad(date.getSeconds()),
    WW: pad(isoWeek(date)),
    ww: pad(isoWeek(date)),
  };
  // Soporta segmentos literales entre corchetes: [Daily]/YYYY-MM-DD
  return format.replace(/\[([^\]]*)\]|YYYY|YY|MMMM|MMM|MM|M|DDDD|DD|D|dddd|ddd|HH|mm|ss|WW|ww/g, (m, literal: string | undefined) =>
    literal !== undefined ? literal : (tokens[m] ?? m)
  );
}

function dayOfYear(d: Date): number {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
}

function isoWeek(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const day = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

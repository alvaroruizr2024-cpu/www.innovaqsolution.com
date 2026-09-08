/**
 * Registro de herramientas MCP sobre un vault de Obsidian.
 * Todas las herramientas usan el prefijo `obsidian_`.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { CHARACTER_LIMIT, DEFAULT_LIMIT, MAX_LIMIT } from "./constants.js";
import {
  Vault,
  VaultError,
  formatDate,
  parseFrontmatter,
  serializeNote,
  type Frontmatter,
} from "./vault.js";

// ---------------------------------------------------------------------------
// Helpers de respuesta
// ---------------------------------------------------------------------------

type Json = Record<string, unknown>;

function ok(text: string, structured?: Json): CallToolResult {
  const truncated =
    text.length > CHARACTER_LIMIT
      ? text.slice(0, CHARACTER_LIMIT) +
        `\n\n[... respuesta truncada a ${CHARACTER_LIMIT} caracteres. Usa limit/offset o filtros más específicos.]`
      : text;
  return {
    content: [{ type: "text", text: truncated }],
    ...(structured ? { structuredContent: structured } : {}),
  };
}

function fail(error: unknown): CallToolResult {
  const message =
    error instanceof VaultError
      ? error.message
      : error instanceof Error
        ? `Error inesperado: ${error.message}`
        : `Error inesperado: ${String(error)}`;
  return { content: [{ type: "text", text: `Error: ${message}` }], isError: true };
}

async function run(fn: () => Promise<CallToolResult>): Promise<CallToolResult> {
  try {
    return await fn();
  } catch (e) {
    return fail(e);
  }
}

function paginate<T>(items: T[], limit: number, offset: number): { page: T[]; meta: Json } {
  const page = items.slice(offset, offset + limit);
  const hasMore = offset + page.length < items.length;
  return {
    page,
    meta: {
      total: items.length,
      count: page.length,
      offset,
      has_more: hasMore,
      ...(hasMore ? { next_offset: offset + page.length } : {}),
    },
  };
}

const ResponseFormat = z.enum(["markdown", "json"]).default("markdown")
  .describe("Formato de salida: 'markdown' legible o 'json' estructurado");

const limitSchema = z.number().int().min(1).max(MAX_LIMIT).default(DEFAULT_LIMIT)
  .describe(`Máximo de resultados (1-${MAX_LIMIT}, por defecto ${DEFAULT_LIMIT})`);
const offsetSchema = z.number().int().min(0).default(0)
  .describe("Resultados a saltar para paginación");
const notePathSchema = z.string().min(1)
  .describe("Ruta de la nota relativa al vault, p. ej. 'Proyectos/ERP360.md' (la extensión .md es opcional)");

const frontmatterSchema = z.record(z.string(), z.unknown());

// ---------------------------------------------------------------------------
// Registro
// ---------------------------------------------------------------------------

export function registerTools(server: McpServer, vault: Vault): void {
  // ---- obsidian_vault_info -------------------------------------------------
  server.registerTool(
    "obsidian_vault_info",
    {
      title: "Información del vault",
      description: `Devuelve un resumen del vault de Obsidian: ruta, número de notas, carpetas, etiquetas y las notas modificadas más recientemente.

Útil como primer paso para orientarse antes de listar o buscar.

Returns (json):
  { "vault_path": string, "note_count": number, "folder_count": number, "tag_count": number,
    "folders": string[], "recent_notes": [{ "path": string, "modified": string }] }`,
      inputSchema: { response_format: ResponseFormat },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ response_format }) =>
      run(async () => {
        const index = await vault.index();
        const folders = await vault.listFolders();
        const recent = [...index.notes]
          .sort((a, b) => b.modified.localeCompare(a.modified))
          .slice(0, 10)
          .map((n) => ({ path: n.path, modified: n.modified }));
        const out: Json = {
          vault_path: vault.root,
          note_count: index.notes.length,
          folder_count: folders.length,
          tag_count: index.tagCounts().size,
          folders: folders.slice(0, 100),
          recent_notes: recent,
        };
        if (response_format === "json") return ok(JSON.stringify(out, null, 2), out);
        const lines = [
          `# Vault: ${vault.root}`,
          "",
          `- Notas: ${index.notes.length}`,
          `- Carpetas: ${folders.length}`,
          `- Etiquetas: ${index.tagCounts().size}`,
          "",
          "## Carpetas",
          ...(folders.length ? folders.slice(0, 100).map((f) => `- ${f}`) : ["- (ninguna)"]),
          "",
          "## Modificadas recientemente",
          ...recent.map((n) => `- ${n.path} (${n.modified})`),
        ];
        return ok(lines.join("\n"), out);
      })
  );

  // ---- obsidian_list_notes -------------------------------------------------
  server.registerTool(
    "obsidian_list_notes",
    {
      title: "Listar notas",
      description: `Lista las notas (.md) del vault, opcionalmente dentro de una carpeta, con paginación.

Args:
  - folder (string, opcional): carpeta relativa al vault ("" = raíz)
  - recursive (boolean): incluir subcarpetas (por defecto true)
  - sort ('path' | 'modified' | 'created' | 'name'): orden (por defecto 'path')
  - limit / offset: paginación
  - response_format: 'markdown' | 'json'

Returns (json):
  { "total": number, "count": number, "offset": number, "has_more": boolean, "next_offset"?: number,
    "notes": [{ "path": string, "name": string, "folder": string, "size": number, "modified": string, "created": string }] }`,
      inputSchema: {
        folder: z.string().default("").describe("Carpeta relativa al vault; vacío para la raíz"),
        recursive: z.boolean().default(true).describe("Incluir subcarpetas"),
        sort: z.enum(["path", "modified", "created", "name"]).default("path").describe("Criterio de orden"),
        limit: limitSchema,
        offset: offsetSchema,
        response_format: ResponseFormat,
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ folder, recursive, sort, limit, offset, response_format }) =>
      run(async () => {
        const notes = await vault.listNotes(folder, recursive);
        if (sort === "modified" || sort === "created") notes.sort((a, b) => b[sort].localeCompare(a[sort]));
        else if (sort === "name") notes.sort((a, b) => a.name.localeCompare(b.name));
        const { page, meta } = paginate(notes, limit, offset);
        const out: Json = { ...meta, notes: page };
        if (response_format === "json") return ok(JSON.stringify(out, null, 2), out);
        if (!page.length) return ok(`No hay notas en '${folder || "/"}'.`, out);
        const lines = [
          `# Notas en '${folder || "/"}' (${meta.total} en total, mostrando ${meta.count})`,
          "",
          ...page.map((n) => `- ${n.path} — ${n.size} bytes, modificada ${n.modified.slice(0, 10)}`),
        ];
        if (meta.has_more) lines.push("", `Hay más resultados: usa offset=${meta.next_offset}.`);
        return ok(lines.join("\n"), out);
      })
  );

  // ---- obsidian_read_note --------------------------------------------------
  server.registerTool(
    "obsidian_read_note",
    {
      title: "Leer nota",
      description: `Lee una nota completa: contenido Markdown, frontmatter YAML, etiquetas y enlaces [[wikilink]] con su resolución.

Args:
  - path (string): ruta de la nota relativa al vault (extensión .md opcional)
  - include_content (boolean): incluir el cuerpo completo (por defecto true)

Returns (json):
  { "path": string, "name": string, "folder": string, "size": number, "modified": string, "created": string,
    "frontmatter": object, "tags": string[],
    "links": [{ "target": string, "heading"?: string, "alias"?: string, "resolved": string | null }],
    "content": string }`,
      inputSchema: {
        path: notePathSchema,
        include_content: z.boolean().default(true).describe("Incluir el texto completo de la nota"),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ path: notePath, include_content }) =>
      run(async () => {
        const note = await vault.readNote(notePath);
        const out: Json = {
          path: note.path,
          name: note.name,
          folder: note.folder,
          size: note.size,
          modified: note.modified,
          created: note.created,
          frontmatter: note.frontmatter,
          tags: note.tags,
          links: note.links,
          ...(include_content ? { content: note.content } : {}),
        };
        const header = [
          `# ${note.name}`,
          `Ruta: ${note.path} | Modificada: ${note.modified} | ${note.size} bytes`,
          note.tags.length ? `Etiquetas: ${note.tags.map((t) => "#" + t).join(" ")}` : "Etiquetas: (ninguna)",
          note.links.length
            ? `Enlaces: ${note.links.map((l) => (l.resolved ? l.resolved : `${l.target} (roto)`)).join(", ")}`
            : "Enlaces: (ninguno)",
          Object.keys(note.frontmatter).length ? `Frontmatter: ${JSON.stringify(note.frontmatter)}` : "",
          "",
        ].filter((l, i) => l !== "" || i === 5);
        const text = include_content ? [...header, "---", "", note.content].join("\n") : header.join("\n");
        return ok(text, out);
      })
  );

  // ---- obsidian_search_notes -----------------------------------------------
  server.registerTool(
    "obsidian_search_notes",
    {
      title: "Buscar en notas",
      description: `Busca texto en el contenido y nombres de las notas del vault. Devuelve coincidencias con contexto de línea.

Args:
  - query (string): texto a buscar (o expresión regular si mode='regex')
  - mode ('text' | 'regex'): tipo de búsqueda (por defecto 'text')
  - case_sensitive (boolean): distinguir mayúsculas (por defecto false)
  - folder (string, opcional): restringir a una carpeta
  - tag (string, opcional): restringir a notas con esa etiqueta (sin #)
  - max_matches_per_note (number): líneas de contexto por nota (por defecto 3)
  - limit / offset: paginación sobre notas
  - response_format: 'markdown' | 'json'

Returns (json):
  { "query": string, "total": number, "count": number, "offset": number, "has_more": boolean,
    "results": [{ "path": string, "name": string, "match_count": number, "name_match": boolean,
                  "matches": [{ "line": number, "text": string }] }] }

Ejemplos:
  - "¿Dónde menciono SUNAT?" -> query="SUNAT"
  - "Notas con fechas 2026-0X" -> query="2026-0\\d", mode="regex"
  - "Reuniones etiquetadas #cliente" -> query="reunión", tag="cliente"`,
      inputSchema: {
        query: z.string().min(1).max(500).describe("Texto o regex a buscar"),
        mode: z.enum(["text", "regex"]).default("text").describe("Búsqueda literal o por expresión regular"),
        case_sensitive: z.boolean().default(false).describe("Distinguir mayúsculas/minúsculas"),
        folder: z.string().default("").describe("Carpeta donde buscar; vacío para todo el vault"),
        tag: z.string().optional().describe("Filtrar por etiqueta (sin #)"),
        max_matches_per_note: z.number().int().min(1).max(50).default(3).describe("Líneas de contexto por nota"),
        limit: limitSchema,
        offset: offsetSchema,
        response_format: ResponseFormat,
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ query, mode, case_sensitive, folder, tag, max_matches_per_note, limit, offset, response_format }) =>
      run(async () => {
        const flags = case_sensitive ? "g" : "gi";
        let re: RegExp;
        try {
          re = new RegExp(mode === "regex" ? query : escapeRegExp(query), flags);
        } catch (e) {
          throw new VaultError(`Expresión regular inválida: ${(e as Error).message}`);
        }
        const folderNorm = vault.normalizeFolder(folder);
        const tagNorm = tag?.replace(/^#/, "").toLowerCase();
        const index = await vault.index();
        const results: Json[] = [];
        for (const n of index.notes) {
          if (folderNorm && !(n.path === folderNorm || n.path.startsWith(folderNorm + "/"))) continue;
          if (tagNorm && !n.tags.some((t) => t.toLowerCase() === tagNorm || t.toLowerCase().startsWith(tagNorm + "/"))) continue;
          const nameMatch = re.test(n.name);
          re.lastIndex = 0;
          const matches: { line: number; text: string }[] = [];
          let count = 0;
          const lines = n.content.split(/\r?\n/);
          for (let i = 0; i < lines.length; i++) {
            re.lastIndex = 0;
            if (re.test(lines[i])) {
              count++;
              if (matches.length < max_matches_per_note) matches.push({ line: i + 1, text: lines[i].trim().slice(0, 300) });
            }
          }
          if (count === 0 && !nameMatch) continue;
          results.push({ path: n.path, name: n.name, match_count: count, name_match: nameMatch, matches });
        }
        results.sort((a, b) => (b.match_count as number) - (a.match_count as number));
        const { page, meta } = paginate(results, limit, offset);
        const out: Json = { query, ...meta, results: page };
        if (response_format === "json") return ok(JSON.stringify(out, null, 2), out);
        if (!page.length) return ok(`Sin resultados para '${query}'.`, out);
        const lines = [`# Resultados para '${query}' (${meta.total} notas)`, ""];
        for (const r of page) {
          lines.push(`## ${r.path} (${r.match_count} coincidencias${r.name_match ? ", nombre coincide" : ""})`);
          for (const m of r.matches as { line: number; text: string }[]) lines.push(`- L${m.line}: ${m.text}`);
          lines.push("");
        }
        if (meta.has_more) lines.push(`Hay más resultados: usa offset=${meta.next_offset}.`);
        return ok(lines.join("\n"), out);
      })
  );

  // ---- obsidian_create_note ------------------------------------------------
  server.registerTool(
    "obsidian_create_note",
    {
      title: "Crear nota",
      description: `Crea una nota nueva en el vault. Crea las carpetas intermedias si no existen. Por defecto falla si la nota ya existe.

Args:
  - path (string): ruta destino (p. ej. 'Clientes/Panasur.md')
  - content (string): cuerpo Markdown
  - frontmatter (object, opcional): propiedades YAML a incluir (p. ej. {"tags": ["cliente"], "status": "activo"})
  - overwrite (boolean): reemplazar si ya existe (por defecto false)

Returns (json): { "path": string, "created": boolean, "overwritten": boolean, "size": number }`,
      inputSchema: {
        path: notePathSchema,
        content: z.string().default("").describe("Cuerpo Markdown de la nota"),
        frontmatter: frontmatterSchema.optional().describe("Propiedades YAML de frontmatter"),
        overwrite: z.boolean().default(false).describe("Sobrescribir si ya existe"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    },
    async ({ path: notePath, content, frontmatter, overwrite }) =>
      run(async () => {
        const rel = vault.normalizeNotePath(notePath);
        const existed = await vault.exists(rel);
        if (existed && !overwrite) {
          throw new VaultError(`La nota ya existe: ${rel}. Usa overwrite=true o obsidian_update_note para modificarla.`);
        }
        const text = serializeNote(frontmatter ?? {}, content);
        await vault.writeRaw(rel, text);
        const out: Json = { path: rel, created: !existed, overwritten: existed, size: Buffer.byteLength(text, "utf8") };
        return ok(`${existed ? "Sobrescrita" : "Creada"} la nota ${rel} (${out.size} bytes).`, out);
      })
  );

  // ---- obsidian_update_note ------------------------------------------------
  server.registerTool(
    "obsidian_update_note",
    {
      title: "Actualizar nota",
      description: `Modifica el contenido de una nota existente conservando su frontmatter (salvo en modo 'overwrite' con contenido que incluya su propio frontmatter).

Args:
  - path (string): ruta de la nota
  - content (string): texto a escribir/añadir
  - mode ('append' | 'prepend' | 'overwrite' | 'replace'): 
      append   = añade al final (por defecto)
      prepend  = inserta al inicio del cuerpo, tras el frontmatter
      overwrite= reemplaza todo el cuerpo (mantiene frontmatter)
      replace  = sustituye la primera aparición de 'find' por 'content'
  - find (string): requerido en modo 'replace'
  - create_if_missing (boolean): crear la nota si no existe (por defecto false)

Returns (json): { "path": string, "mode": string, "size": number, "created": boolean }`,
      inputSchema: {
        path: notePathSchema,
        content: z.string().describe("Texto a escribir"),
        mode: z.enum(["append", "prepend", "overwrite", "replace"]).default("append").describe("Modo de edición"),
        find: z.string().optional().describe("Texto a sustituir (solo mode='replace')"),
        create_if_missing: z.boolean().default(false).describe("Crear la nota si no existe"),
      },
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false },
    },
    async ({ path: notePath, content, mode, find, create_if_missing }) =>
      run(async () => {
        const rel = vault.normalizeNotePath(notePath);
        const exists = await vault.exists(rel);
        if (!exists && !create_if_missing) {
          throw new VaultError(`La nota no existe: ${rel}. Usa create_if_missing=true o obsidian_create_note.`);
        }
        const raw = exists ? await vault.readRaw(rel) : "";
        const parsed = parseFrontmatter(raw);
        let body: string;
        switch (mode) {
          case "append":
            body = parsed.body.length && !parsed.body.endsWith("\n") ? `${parsed.body}\n${content}` : parsed.body + content;
            break;
          case "prepend":
            body = content.endsWith("\n") ? content + parsed.body : `${content}\n${parsed.body}`;
            break;
          case "overwrite":
            body = content;
            break;
          case "replace": {
            if (!find) throw new VaultError("El modo 'replace' requiere el parámetro 'find'.");
            if (!parsed.body.includes(find)) {
              throw new VaultError(`No se encontró el texto a sustituir en ${rel}. Lee la nota con obsidian_read_note y copia el fragmento exacto.`);
            }
            body = parsed.body.replace(find, () => content);
            break;
          }
        }
        const text = serializeNote(parsed.frontmatter, body);
        await vault.writeRaw(rel, text);
        const out: Json = { path: rel, mode, size: Buffer.byteLength(text, "utf8"), created: !exists };
        return ok(`Nota ${rel} actualizada (modo ${mode}, ${out.size} bytes).`, out);
      })
  );

  // ---- obsidian_update_frontmatter -----------------------------------------
  server.registerTool(
    "obsidian_update_frontmatter",
    {
      title: "Actualizar frontmatter",
      description: `Añade, modifica o elimina propiedades YAML del frontmatter de una nota sin tocar el cuerpo.

Args:
  - path (string): ruta de la nota
  - set (object, opcional): propiedades a establecer/sobrescribir, p. ej. {"status": "done", "tags": ["a","b"]}
  - remove (string[], opcional): claves a eliminar

Returns (json): { "path": string, "frontmatter": object }`,
      inputSchema: {
        path: notePathSchema,
        set: frontmatterSchema.optional().describe("Propiedades a establecer"),
        remove: z.array(z.string()).optional().describe("Claves a eliminar"),
      },
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false },
    },
    async ({ path: notePath, set, remove }) =>
      run(async () => {
        if (!set && !remove?.length) throw new VaultError("Indica 'set' y/o 'remove'.");
        const rel = vault.normalizeNotePath(notePath);
        const raw = await vault.readRaw(rel);
        const parsed = parseFrontmatter(raw);
        const fm: Frontmatter = { ...parsed.frontmatter, ...(set ?? {}) };
        for (const k of remove ?? []) delete fm[k];
        await vault.writeRaw(rel, serializeNote(fm, parsed.body));
        const out: Json = { path: rel, frontmatter: fm };
        return ok(`Frontmatter de ${rel} actualizado:\n${JSON.stringify(fm, null, 2)}`, out);
      })
  );

  // ---- obsidian_delete_note ------------------------------------------------
  server.registerTool(
    "obsidian_delete_note",
    {
      title: "Eliminar nota",
      description: `Elimina una nota. Por defecto la mueve a la papelera del vault (.trash/) para poder recuperarla; con permanent=true la borra definitivamente.

Args:
  - path (string): ruta de la nota
  - permanent (boolean): borrar sin pasar por la papelera (por defecto false)

Returns (json): { "path": string, "trashed_to"?: string, "permanent": boolean }`,
      inputSchema: {
        path: notePathSchema,
        permanent: z.boolean().default(false).describe("Borrado definitivo en lugar de mover a .trash"),
      },
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: false },
    },
    async ({ path: notePath, permanent }) =>
      run(async () => {
        const res = await vault.deleteNote(notePath, permanent);
        const out: Json = { ...res, permanent };
        return ok(
          permanent ? `Nota ${res.path} eliminada permanentemente.` : `Nota ${res.path} movida a ${res.trashed_to}.`,
          out
        );
      })
  );

  // ---- obsidian_move_note --------------------------------------------------
  server.registerTool(
    "obsidian_move_note",
    {
      title: "Mover o renombrar nota",
      description: `Mueve o renombra una nota y, opcionalmente, actualiza los [[wikilinks]] de otras notas que apuntaban a ella.

Args:
  - from (string): ruta actual
  - to (string): ruta nueva (puede cambiar carpeta y/o nombre)
  - update_links (boolean): reescribir enlaces en las demás notas (por defecto true)
  - overwrite (boolean): reemplazar si el destino existe (por defecto false)

Returns (json): { "from": string, "to": string, "links_updated_in": string[] }`,
      inputSchema: {
        from: notePathSchema,
        to: z.string().min(1).describe("Ruta nueva relativa al vault"),
        update_links: z.boolean().default(true).describe("Actualizar wikilinks en otras notas"),
        overwrite: z.boolean().default(false).describe("Sobrescribir destino si existe"),
      },
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: false },
    },
    async ({ from, to, update_links, overwrite }) =>
      run(async () => {
        const relFrom = vault.normalizeNotePath(from);
        const relTo = vault.normalizeNotePath(to);
        const index = await vault.index();
        const referrers = update_links ? index.backlinks(relFrom) : [];
        const moved = await vault.moveNote(relFrom, relTo, overwrite);

        const oldName = basenameNoExt(relFrom);
        const newName = basenameNoExt(relTo);
        const oldNoExt = relFrom.slice(0, -3);
        const newNoExt = relTo.slice(0, -3);
        const updated: string[] = [];
        for (const ref of referrers) {
          const raw = await vault.readRaw(ref.source);
          const replaced = raw.replace(/(?<!\!)\[\[([^\]\|#]+)((?:#[^\]\|]*)?(?:\|[^\]]*)?)\]\]/g, (m, target: string, rest: string) => {
            const t = target.trim();
            const tl = t.toLowerCase();
            const matchesOld =
              tl === oldName.toLowerCase() ||
              tl === oldNoExt.toLowerCase() ||
              tl === relFrom.toLowerCase();
            if (!matchesOld) return m;
            // Conserva el estilo: nombre corto si el nuevo nombre sigue siendo único, si no ruta completa.
            const stillUnique = index.notes.filter((n) => n.name.toLowerCase() === newName.toLowerCase() && n.path !== relFrom).length === 0;
            const newTarget = tl === oldName.toLowerCase() && stillUnique ? newName : newNoExt;
            return `[[${newTarget}${rest}]]`;
          });
          if (replaced !== raw) {
            await vault.writeRaw(ref.source, replaced);
            updated.push(ref.source);
          }
        }
        const out: Json = { ...moved, links_updated_in: updated };
        return ok(
          `Nota movida de ${moved.from} a ${moved.to}.` +
            (updated.length ? ` Enlaces actualizados en: ${updated.join(", ")}.` : ""),
          out
        );
      })
  );

  // ---- obsidian_list_tags --------------------------------------------------
  server.registerTool(
    "obsidian_list_tags",
    {
      title: "Listar etiquetas",
      description: `Lista todas las etiquetas del vault (frontmatter e inline #tag) con el número de notas que las usan.

Args:
  - prefix (string, opcional): filtrar etiquetas que empiecen por este texto (p. ej. 'proyecto/')
  - limit / offset: paginación
  - response_format: 'markdown' | 'json'

Returns (json): { "total": number, "count": number, "tags": [{ "tag": string, "count": number }] }`,
      inputSchema: {
        prefix: z.string().default("").describe("Prefijo de etiqueta (sin #)"),
        limit: limitSchema,
        offset: offsetSchema,
        response_format: ResponseFormat,
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ prefix, limit, offset, response_format }) =>
      run(async () => {
        const index = await vault.index();
        const p = prefix.replace(/^#/, "").toLowerCase();
        const tags = [...index.tagCounts().entries()]
          .filter(([t]) => !p || t.toLowerCase().startsWith(p))
          .map(([tag, count]) => ({ tag, count }))
          .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
        const { page, meta } = paginate(tags, limit, offset);
        const out: Json = { ...meta, tags: page };
        if (response_format === "json") return ok(JSON.stringify(out, null, 2), out);
        if (!page.length) return ok("No hay etiquetas que coincidan.", out);
        return ok([`# Etiquetas (${meta.total})`, "", ...page.map((t) => `- #${t.tag} (${t.count})`)].join("\n"), out);
      })
  );

  // ---- obsidian_get_backlinks ----------------------------------------------
  server.registerTool(
    "obsidian_get_backlinks",
    {
      title: "Obtener backlinks",
      description: `Devuelve las notas que enlazan a una nota dada mediante [[wikilinks]], y también los enlaces salientes de esa nota.

Args:
  - path (string): ruta de la nota

Returns (json):
  { "path": string,
    "backlinks": [{ "source": string, "links": [{ "target": string, "heading"?: string, "alias"?: string }] }],
    "outgoing": [{ "target": string, "resolved": string | null }],
    "broken_links": string[] }`,
      inputSchema: { path: notePathSchema },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ path: notePath }) =>
      run(async () => {
        const note = await vault.readNote(notePath);
        const index = await vault.index();
        const backlinks = index.backlinks(note.path);
        const outgoing = note.links.map((l) => ({ target: l.target, resolved: l.resolved }));
        const broken = note.links.filter((l) => !l.resolved).map((l) => l.target);
        const out: Json = { path: note.path, backlinks, outgoing, broken_links: broken };
        const lines = [
          `# Enlaces de ${note.path}`,
          "",
          `## Backlinks (${backlinks.length})`,
          ...(backlinks.length ? backlinks.map((b) => `- ${b.source}`) : ["- (ninguno)"]),
          "",
          `## Salientes (${outgoing.length})`,
          ...(outgoing.length ? outgoing.map((o) => `- ${o.target} → ${o.resolved ?? "(roto)"}`) : ["- (ninguno)"]),
        ];
        return ok(lines.join("\n"), out);
      })
  );

  // ---- obsidian_daily_note -------------------------------------------------
  server.registerTool(
    "obsidian_daily_note",
    {
      title: "Nota diaria",
      description: `Obtiene (y opcionalmente crea o amplía) la nota diaria de una fecha, respetando la configuración del plugin Daily Notes del vault (.obsidian/daily-notes.json: carpeta, formato y plantilla).

Args:
  - date (string, opcional): fecha ISO 'YYYY-MM-DD' (por defecto hoy)
  - create (boolean): crear la nota si no existe (por defecto true)
  - append (string, opcional): texto a añadir al final de la nota diaria

Returns (json): { "path": string, "date": string, "existed": boolean, "created": boolean, "content": string }`,
      inputSchema: {
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato esperado YYYY-MM-DD").optional().describe("Fecha YYYY-MM-DD"),
        create: z.boolean().default(true).describe("Crear si no existe"),
        append: z.string().optional().describe("Texto a añadir al final"),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    },
    async ({ date, create, append }) =>
      run(async () => {
        const cfg = (await vault.readObsidianConfig<{ folder?: string; format?: string; template?: string }>("daily-notes.json")) ?? {};
        const folder = vault.normalizeFolder(process.env.OBSIDIAN_DAILY_FOLDER ?? cfg.folder ?? "");
        const format = process.env.OBSIDIAN_DAILY_FORMAT ?? cfg.format ?? "YYYY-MM-DD";
        const d = date ? new Date(`${date}T12:00:00`) : new Date();
        if (Number.isNaN(d.getTime())) throw new VaultError(`Fecha inválida: ${date}`);
        const isoDate = formatDate(d, "YYYY-MM-DD");
        const name = formatDate(d, format);
        const rel = vault.normalizeNotePath(folder ? `${folder}/${name}` : name);

        const existed = await vault.exists(rel);
        let created = false;
        if (!existed) {
          if (!create) throw new VaultError(`No existe la nota diaria ${rel}. Usa create=true para crearla.`);
          let template = "";
          if (cfg.template) {
            try {
              template = await vault.readRaw(cfg.template);
              template = template.replace(/\{\{\s*date(?::([^}]+))?\s*\}\}/g, (_m, f: string | undefined) => formatDate(d, f?.trim() || "YYYY-MM-DD"))
                .replace(/\{\{\s*title\s*\}\}/g, name)
                .replace(/\{\{\s*time(?::([^}]+))?\s*\}\}/g, (_m, f: string | undefined) => formatDate(new Date(), f?.trim() || "HH:mm"));
            } catch {
              template = "";
            }
          }
          await vault.writeRaw(rel, template || `# ${name}\n\n`);
          created = true;
        }
        if (append !== undefined && append !== "") {
          const raw = await vault.readRaw(rel);
          const sep = raw.length && !raw.endsWith("\n") ? "\n" : "";
          await vault.writeRaw(rel, `${raw}${sep}${append}${append.endsWith("\n") ? "" : "\n"}`);
        }
        const content = await vault.readRaw(rel);
        const out: Json = { path: rel, date: isoDate, existed, created, content };
        return ok(`# Nota diaria ${isoDate} (${rel})${created ? " — creada" : ""}\n\n${content}`, out);
      })
  );
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function basenameNoExt(p: string): string {
  const base = p.split("/").pop() ?? p;
  return base.replace(/\.md$/i, "");
}

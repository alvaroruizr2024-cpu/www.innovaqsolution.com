/**
 * Prueba de humo: crea un vault temporal, arranca el servidor por stdio con el
 * cliente oficial del SDK y ejercita cada herramienta.
 *   npm run build && npm run smoke
 */
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { mkdtemp, mkdir, writeFile, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";

const vault = await mkdtemp(join(tmpdir(), "obsidian-vault-"));
await mkdir(join(vault, "Proyectos"), { recursive: true });
await mkdir(join(vault, "Diario"), { recursive: true });
await mkdir(join(vault, ".obsidian"), { recursive: true });
await writeFile(join(vault, ".obsidian", "daily-notes.json"), JSON.stringify({ folder: "Diario", format: "YYYY-MM-DD", template: "Plantillas/Diaria" }));
await mkdir(join(vault, "Plantillas"), { recursive: true });
await writeFile(join(vault, "Plantillas", "Diaria.md"), "# {{date:DD/MM/YYYY}}\n\n## Tareas\n");
await writeFile(join(vault, "Proyectos", "ERP360.md"), "---\ntags: [proyecto, erp]\nstatus: activo\n---\n# ERP360\n\nSistema para [[Panasur]] con módulo SUNAT. Ver [[Proyectos/SIG360|SIG]].\n\n#innovaq/erp\n\n```js\nconst x = \"#nolabel [[NoLink]]\";\n```\n");
await writeFile(join(vault, "Proyectos", "SIG360.md"), "# SIG360\n\nGestión integrada. Relacionado con [[ERP360]].\n");
await writeFile(join(vault, "Panasur.md"), "# Panasur\n\nCliente principal. Tag #cliente.\n");

const client = new Client({ name: "smoke", version: "1.0.0" });
const transport = new StdioClientTransport({
  command: "node",
  args: [new URL("../dist/index.js", import.meta.url).pathname],
  env: { ...process.env, OBSIDIAN_VAULT_PATH: vault },
  stderr: "pipe",
});
await client.connect(transport);

const call = async (name, args = {}) => {
  const res = await client.callTool({ name, arguments: args });
  const text = res.content[0]?.text ?? "";
  if (res.isError) throw new Error(`${name} -> ${text}`);
  return { text, data: res.structuredContent };
};
const expectError = async (name, args, needle) => {
  const res = await client.callTool({ name, arguments: args });
  assert.ok(res.isError, `${name} debería fallar`);
  assert.match(res.content[0].text, needle);
};

try {
  const { tools } = await client.listTools();
  const names = tools.map((t) => t.name).sort();
  console.log("Herramientas:", names.join(", "));
  assert.equal(names.length, 12);

  let r = await call("obsidian_vault_info", { response_format: "json" });
  assert.equal(r.data.note_count, 4);
  assert.deepEqual(r.data.folders, ["Diario", "Plantillas", "Proyectos"]);

  r = await call("obsidian_list_notes", { folder: "Proyectos" });
  assert.equal(r.data.total, 2);

  r = await call("obsidian_read_note", { path: "Proyectos/ERP360" });
  assert.deepEqual(r.data.tags, ["erp", "innovaq/erp", "proyecto"]);
  assert.equal(r.data.frontmatter.status, "activo");
  assert.deepEqual(r.data.links.map((l) => l.resolved), ["Panasur.md", "Proyectos/SIG360.md"]);
  assert.equal(r.data.links[1].alias, "SIG");

  r = await call("obsidian_search_notes", { query: "sunat" });
  assert.equal(r.data.total, 1);
  assert.equal(r.data.results[0].path, "Proyectos/ERP360.md");
  r = await call("obsidian_search_notes", { query: "^# \\w+360$", mode: "regex" });
  assert.equal(r.data.total, 2);
  r = await call("obsidian_search_notes", { query: "cliente", tag: "cliente" });
  assert.equal(r.data.total, 1);
  await expectError("obsidian_search_notes", { query: "(", mode: "regex" }, /regular inválida/);

  r = await call("obsidian_list_tags");
  assert.deepEqual(r.data.tags.map((t) => t.tag), ["cliente", "erp", "innovaq/erp", "proyecto"]);

  r = await call("obsidian_get_backlinks", { path: "Panasur" });
  assert.deepEqual(r.data.backlinks.map((b) => b.source), ["Proyectos/ERP360.md"]);

  r = await call("obsidian_create_note", { path: "Clientes/Nuevo", content: "Hola [[Panasur]]", frontmatter: { tags: ["cliente"], prioridad: 1 } });
  assert.equal(r.data.created, true);
  assert.equal(await readFile(join(vault, "Clientes", "Nuevo.md"), "utf8"), "---\ntags:\n  - cliente\nprioridad: 1\n---\nHola [[Panasur]]");
  await expectError("obsidian_create_note", { path: "Clientes/Nuevo", content: "x" }, /ya existe/);
  await expectError("obsidian_create_note", { path: "../fuera", content: "x" }, /sale del vault/);
  await expectError("obsidian_create_note", { path: ".obsidian/app", content: "x" }, /\.obsidian/);

  r = await call("obsidian_update_note", { path: "Clientes/Nuevo", content: "- tarea" });
  assert.match(await readFile(join(vault, "Clientes", "Nuevo.md"), "utf8"), /Hola \[\[Panasur\]\]\n- tarea$/);
  r = await call("obsidian_update_note", { path: "Clientes/Nuevo", content: "Adiós", mode: "replace", find: "Hola" });
  assert.match(await readFile(join(vault, "Clientes", "Nuevo.md"), "utf8"), /^---\ntags:[\s\S]*---\nAdiós \[\[Panasur\]\]/);
  await expectError("obsidian_update_note", { path: "NoExiste", content: "x" }, /no existe/);

  r = await call("obsidian_update_frontmatter", { path: "Clientes/Nuevo", set: { status: "done" }, remove: ["prioridad"] });
  assert.deepEqual(r.data.frontmatter, { tags: ["cliente"], status: "done" });

  r = await call("obsidian_move_note", { from: "Panasur", to: "Clientes/Panasur SA" });
  assert.deepEqual(r.data.links_updated_in.sort(), ["Clientes/Nuevo.md", "Proyectos/ERP360.md"]);
  assert.match(await readFile(join(vault, "Proyectos", "ERP360.md"), "utf8"), /\[\[Panasur SA\]\]/);
  r = await call("obsidian_get_backlinks", { path: "Clientes/Panasur SA" });
  assert.equal(r.data.backlinks.length, 2);

  r = await call("obsidian_daily_note", { date: "2026-09-08", append: "- reunión" });
  assert.equal(r.data.path, "Diario/2026-09-08.md");
  assert.equal(r.data.created, true);
  assert.equal(r.data.content, "# 08/09/2026\n\n## Tareas\n- reunión\n");
  r = await call("obsidian_daily_note", { date: "2026-09-08" });
  assert.equal(r.data.existed, true);

  r = await call("obsidian_delete_note", { path: "Clientes/Nuevo" });
  assert.equal(r.data.trashed_to, ".trash/Clientes/Nuevo.md");
  await readFile(join(vault, ".trash", "Clientes", "Nuevo.md"));
  r = await call("obsidian_delete_note", { path: "Proyectos/SIG360", permanent: true });
  await expectError("obsidian_read_note", { path: "Proyectos/SIG360" }, /no existe/);

  const { resources } = await client.listResources();
  assert.ok(resources.some((x) => x.uri === "obsidian://note/Proyectos/ERP360.md"));
  const res = await client.readResource({ uri: "obsidian://note/Proyectos/ERP360.md" });
  assert.match(res.contents[0].text, /^---\ntags/);

  console.log("✅ Prueba de humo superada");
} finally {
  await client.close();
  await rm(vault, { recursive: true, force: true });
}

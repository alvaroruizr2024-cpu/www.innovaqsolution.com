#!/usr/bin/env node
/**
 * obsidian-mcp-server
 *
 * Servidor MCP que expone un vault de Obsidian (carpeta de archivos Markdown)
 * como herramientas y recursos para modelos de lenguaje.
 *
 * Configuración:
 *   OBSIDIAN_VAULT_PATH   Ruta al vault (obligatoria; también se acepta como
 *                         primer argumento de línea de comandos).
 *   OBSIDIAN_DAILY_FOLDER Carpeta de notas diarias (opcional; sobrescribe
 *                         .obsidian/daily-notes.json).
 *   OBSIDIAN_DAILY_FORMAT Formato de nombre de nota diaria (opcional).
 */

import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerTools } from "./tools.js";
import { Vault, VaultError } from "./vault.js";

const SERVER_NAME = "obsidian-mcp-server";
const SERVER_VERSION = "1.0.0";

function printHelp(): void {
  console.log(`${SERVER_NAME} v${SERVER_VERSION}

Uso:
  obsidian-mcp-server [ruta-del-vault]
  OBSIDIAN_VAULT_PATH=/ruta/al/vault obsidian-mcp-server

El servidor habla MCP por stdio. Configúralo en tu cliente MCP, por ejemplo en
Claude Desktop (claude_desktop_config.json) o Claude Code (.mcp.json):

  {
    "mcpServers": {
      "obsidian": {
        "command": "node",
        "args": ["/ruta/a/obsidian-mcp-server/dist/index.js"],
        "env": { "OBSIDIAN_VAULT_PATH": "/ruta/al/vault" }
      }
    }
  }
`);
}

function registerResources(server: McpServer, vault: Vault): void {
  server.registerResource(
    "note",
    new ResourceTemplate("obsidian://note/{+path}", {
      list: async () => {
        const notes = await vault.listNotes();
        return {
          resources: notes.map((n) => ({
            uri: `obsidian://note/${encodeURI(n.path)}`,
            name: n.name,
            description: n.path,
            mimeType: "text/markdown",
          })),
        };
      },
    }),
    {
      title: "Nota de Obsidian",
      description: "Contenido Markdown de una nota del vault, identificada por su ruta relativa.",
      mimeType: "text/markdown",
    },
    async (uri, variables) => {
      const raw = Array.isArray(variables.path) ? variables.path.join("/") : String(variables.path ?? "");
      const content = await vault.readRaw(decodeURIComponent(raw));
      return { contents: [{ uri: uri.href, mimeType: "text/markdown", text: content }] };
    }
  );
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.includes("--help") || args.includes("-h")) {
    printHelp();
    return;
  }
  if (args.includes("--version") || args.includes("-v")) {
    console.log(SERVER_VERSION);
    return;
  }

  const vaultPath = args.find((a) => !a.startsWith("-")) ?? process.env.OBSIDIAN_VAULT_PATH;
  if (!vaultPath) {
    console.error("ERROR: falta la ruta del vault. Define OBSIDIAN_VAULT_PATH o pásala como argumento.");
    printHelp();
    process.exit(1);
  }

  const vault = await Vault.open(vaultPath);

  const server = new McpServer(
    { name: SERVER_NAME, version: SERVER_VERSION },
    {
      instructions:
        "Servidor MCP para un vault de Obsidian. Empieza con obsidian_vault_info para orientarte, " +
        "usa obsidian_search_notes / obsidian_list_notes para localizar notas y obsidian_read_note para leerlas. " +
        "Las rutas son relativas al vault y la extensión .md es opcional. Las eliminaciones van a .trash por defecto.",
    }
  );

  registerTools(server, vault);
  registerResources(server, vault);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(`${SERVER_NAME} v${SERVER_VERSION} listo (vault: ${vault.root})`);
}

main().catch((error: unknown) => {
  if (error instanceof VaultError) console.error(`ERROR: ${error.message}`);
  else console.error("ERROR:", error);
  process.exit(1);
});

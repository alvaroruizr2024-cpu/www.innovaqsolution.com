# obsidian-mcp-server

Servidor [MCP](https://modelcontextprotocol.io) (Model Context Protocol) que expone un vault de
[Obsidian](https://obsidian.md) a asistentes de IA como Claude Desktop, Claude Code o cualquier
cliente MCP. Trabaja directamente sobre la carpeta del vault, así que **no requiere que Obsidian
esté abierto ni ningún plugin**.

## Herramientas

| Herramienta | Descripción |
|---|---|
| `obsidian_vault_info` | Resumen del vault: notas, carpetas, etiquetas y notas recientes |
| `obsidian_list_notes` | Lista notas por carpeta con orden y paginación |
| `obsidian_read_note` | Lee una nota con frontmatter, etiquetas y wikilinks resueltos |
| `obsidian_search_notes` | Busca texto o regex en contenido y nombres, filtrando por carpeta o etiqueta |
| `obsidian_create_note` | Crea una nota (con frontmatter opcional), creando carpetas si faltan |
| `obsidian_update_note` | Añade, antepone, reemplaza o sustituye texto conservando el frontmatter |
| `obsidian_update_frontmatter` | Establece o elimina propiedades YAML sin tocar el cuerpo |
| `obsidian_delete_note` | Mueve a `.trash/` (por defecto) o borra definitivamente |
| `obsidian_move_note` | Mueve o renombra y actualiza los `[[wikilinks]]` que apuntaban a la nota |
| `obsidian_list_tags` | Etiquetas (frontmatter e inline) con recuento de notas |
| `obsidian_get_backlinks` | Notas que enlazan a una nota, enlaces salientes y enlaces rotos |
| `obsidian_daily_note` | Obtiene, crea o amplía la nota diaria respetando `.obsidian/daily-notes.json` |

También expone cada nota como recurso MCP con la URI `obsidian://note/<ruta>`.

Reglas de seguridad: todas las rutas se resuelven dentro del vault (se rechaza `..`), la carpeta
`.obsidian` es de solo lectura y los borrados van a la papelera salvo que se pida `permanent=true`.

## Instalación

```bash
cd obsidian-mcp-server
npm install
npm run build
```

Requiere Node.js 18 o superior.

## Configuración

| Variable | Obligatoria | Descripción |
|---|---|---|
| `OBSIDIAN_VAULT_PATH` | Sí | Ruta a la carpeta del vault (también se acepta como primer argumento) |
| `OBSIDIAN_DAILY_FOLDER` | No | Carpeta de notas diarias; sobrescribe la del plugin Daily Notes |
| `OBSIDIAN_DAILY_FORMAT` | No | Formato del nombre de la nota diaria (p. ej. `YYYY-MM-DD`) |

### Claude Desktop

Edita `claude_desktop_config.json` (macOS: `~/Library/Application Support/Claude/`, Windows:
`%APPDATA%\Claude\`):

```json
{
  "mcpServers": {
    "obsidian": {
      "command": "node",
      "args": ["/ruta/absoluta/a/obsidian-mcp-server/dist/index.js"],
      "env": { "OBSIDIAN_VAULT_PATH": "/ruta/a/mi/vault" }
    }
  }
}
```

### Claude Code

```bash
claude mcp add obsidian -e OBSIDIAN_VAULT_PATH=/ruta/a/mi/vault -- node /ruta/absoluta/a/obsidian-mcp-server/dist/index.js
```

O copia `.mcp.example.json` como `.mcp.json` en la raíz del proyecto y ajusta las rutas.

## Desarrollo

```bash
npm run dev      # recarga en caliente con tsx
npm run build    # compila a dist/
npm run smoke    # prueba de extremo a extremo con un vault temporal
npm run inspect  # abre MCP Inspector contra el servidor compilado
```

## Ejemplos de uso desde el asistente

- "¿Qué notas mencionan a SUNAT?" → `obsidian_search_notes`
- "Resume mi nota de Proyectos/ERP360" → `obsidian_read_note`
- "Añade a la nota diaria de hoy: reunión con Panasur a las 10" → `obsidian_daily_note`
- "Renombra Panasur.md a Clientes/Panasur SA y arregla los enlaces" → `obsidian_move_note`
- "Marca el proyecto como terminado en el frontmatter" → `obsidian_update_frontmatter`

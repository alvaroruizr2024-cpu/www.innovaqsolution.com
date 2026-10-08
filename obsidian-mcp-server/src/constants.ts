/** Límite de caracteres por respuesta para no saturar el contexto del modelo. */
export const CHARACTER_LIMIT = 25000;

/** Extensión canónica de las notas de Obsidian. */
export const NOTE_EXT = ".md";

/** Carpetas que nunca se listan ni se indexan. */
export const IGNORED_DIRS = new Set([".obsidian", ".trash", ".git", "node_modules"]);

/** Carpeta de papelera de Obsidian (relativa al vault). */
export const TRASH_DIR = ".trash";

/** Tamaño máximo por defecto de una página de resultados. */
export const DEFAULT_LIMIT = 50;
export const MAX_LIMIT = 500;

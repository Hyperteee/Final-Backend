const ABSOLUTE_URL_PATTERN = /^([a-z][a-z\d+\-.]*:)?\/\//i;

/**
 * Normalize relative asset paths so they work regardless of the current route
 * and the configured Vite base path.
 *
 * @param {string} rawPath - The path defined in data (e.g. "images/foo.png").
 * @returns {string} A browser-ready URL.
 */
export function resolveAssetPath(rawPath = "") {
  const path = rawPath?.trim();
  if (!path) return "";

  if (ABSOLUTE_URL_PATTERN.test(path)) {
    return path;
  }

  if (path.startsWith("./") || path.startsWith("../")) {
    return path;
  }

  const base = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");
  const cleaned = path.replace(/^\/+/, "");

  if (cleaned && path.startsWith(base)) {
    return path;
  }

  return `${base}/${cleaned}`;
}

export default resolveAssetPath;

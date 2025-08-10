// Helper to ensure proper URL construction with BASE_URL
export function getUrl(path: string = ''): string {
  const base = import.meta.env.BASE_URL || '/';

  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Ensure there's a slash between base and path
  // BASE_URL might not always include trailing slash
  const separator = base.endsWith('/') ? '' : '/';

  // Add trailing slash for GitHub Pages compatibility
  const url = path ? `${base}${separator}${cleanPath}` : base;
  return url.endsWith('/') ? url : `${url}/`;
}

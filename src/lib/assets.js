/**
 * Resolves an asset stored in `public/` against Vite's BASE_URL.
 *
 * `vite.config.js` uses a relative base (`./`) so the built site works from a
 * domain root, a GitHub Pages project sub-path, or any static host without a
 * rebuild. Never hard-code "/assets/..." in JSX — always use `assetUrl()`.
 */
export function assetUrl(publicPath) {
  const base = import.meta.env.BASE_URL || "./";
  const path = publicPath.replace(/^\/+/, "");
  return `${base}${path}`;
}
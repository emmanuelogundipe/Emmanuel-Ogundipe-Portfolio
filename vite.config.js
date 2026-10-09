import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Relative base => the exact same `dist/` works on Vercel, Netlify,
// GitHub Pages (project sub-paths) and any static host.
// Override for a custom domain with an absolute path:
//   BASE_PATH=/ set BASE_PATH=/ npm run build
export default defineConfig(({ mode }) => {
  const base = process.env.BASE_PATH || "./";

  return {
    base,
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      strictPort: true,
      open: false,
    },
    preview: {
      port: 4173,
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: mode !== "production",
      target: "es2020",
      chunkSizeWarningLimit: 900,
    },
  };
});
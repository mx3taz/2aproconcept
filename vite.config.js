import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync, writeFileSync, cpSync, existsSync } from 'fs';
import { glob } from 'fs/promises';

/**
 * Vite plugin: ensures both local file:// and deployed Vercel environments
 * work without 404 or CORS issues.
 */
function fileProtocolCompatPlugin() {
  return {
    name: 'file-protocol-compat',
    enforce: 'post',
    transformIndexHtml(html) {
      return patchHtml(html);
    },
    async closeBundle() {
      // 1. Copy src/ and reference/ into dist/ so classic scripts, styles, and assets resolve on Vercel
      if (existsSync('src')) {
        cpSync('src', 'dist/src', { recursive: true });
      }
      if (existsSync('reference')) {
        cpSync('reference', 'dist/reference', { recursive: true });
      }

      // 2. Also patch the files already written to disk (safety net)
      const files = [];
      for await (const f of glob('dist/**/*.html')) {
        files.push(f);
      }
      for (const file of files) {
        const original = readFileSync(file, 'utf-8');
        const patched = patchHtml(original);
        if (patched !== original) writeFileSync(file, patched, 'utf-8');
      }
    }
  };
}

function patchHtml(html) {
  return html
    // <link rel="stylesheet" crossorigin ...> → remove crossorigin
    .replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet"')
    // <script type="module" crossorigin src="..."> → <script defer src="...">
    .replace(/<script type="module" crossorigin src=/g, '<script defer src=')
    // <script type="module" src="..."> → <script defer src="...">
    .replace(/<script type="module" src=/g, '<script defer src=')
    // any leftover standalone crossorigin attributes
    .replace(/ crossorigin(?=[ >])/g, '');
}

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        solutions: resolve(import.meta.dirname, 'solutions.html'),
        realisations: resolve(import.meta.dirname, 'realisations.html')
      }
    }
  },
  plugins: [fileProtocolCompatPlugin()]
});

import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'fs/promises';

/**
 * Vite plugin: after the build is written to disk, patches every HTML file
 * in dist/ to strip `crossorigin` and `type="module"` so the output works
 * when opened directly via file:// (no local server needed).
 *
 * Chrome blocks both crossorigin attributes and ES-module scripts on file://.
 * The bundled JS is already a self-contained chunk, so `defer` is enough.
 */
function fileProtocolCompatPlugin() {
  return {
    name: 'file-protocol-compat',
    enforce: 'post',
    transformIndexHtml(html) {
      return patchHtml(html);
    },
    async closeBundle() {
      // Also patch the files already written to disk (safety net)
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

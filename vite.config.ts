import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/nspanel-dashboard.ts',
      formats: ['es'],
      fileName: () => 'nspanel-dashboard.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
    minify: true,
    target: 'es2021',
  },
});

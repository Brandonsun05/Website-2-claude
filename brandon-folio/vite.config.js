import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps every asset path relative, so the built /dist folder
// works on GitHub Pages, Netlify, Vercel or any sub-folder host.
export default defineConfig({
  plugins: [react()],
  base: './',
});

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Fix: Property 'cwd' does not exist on type 'Process' error by casting process to any
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Shim process.env.API_KEY for local development to match the existing code structure
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});
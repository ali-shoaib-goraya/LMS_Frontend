import path from 'path'
import { defineConfig, loadEnv } from 'vite' // Added loadEnv
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => { // Now a function receiving mode
  // Load env file based on `mode` (development/production)
  const env = loadEnv(mode, process.cwd(), '') 
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Explicitly pass variables to client
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(env.VITE_API_BASE_URL)
    }
  }
})
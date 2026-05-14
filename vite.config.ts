import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
    publicDir: "public",
     server: {
     proxy: {
      "/api": {
        target: "https://todo-api-ztc2.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  
});

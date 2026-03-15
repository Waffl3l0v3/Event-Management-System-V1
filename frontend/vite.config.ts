import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,    //frontend port
    proxy: {
      "/api": {
        target: "http://localhost:5000",      //backend port
        changeOrigin: true,
      },
    },
  },
});

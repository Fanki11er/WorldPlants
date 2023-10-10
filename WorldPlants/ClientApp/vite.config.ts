import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
//!! Development =>
// import mkcert from "vite-plugin-mkcert";
//!!

//!! Production
export default defineConfig({
  plugins: [react()],
});
//!! Development =>
/*export default defineConfig({
  server: {
    https: true,
    port: 44409,
    host: true,
  },
  plugins: [react(), mkcert()],
});*/

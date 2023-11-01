import { UserConfig, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

const development: UserConfig = {
  server: {
    https: true,
    port: 44409,
    host: true,
  },
  plugins: [react(), mkcert()],
};
const production: UserConfig = {
  plugins: [react(), mkcert()],
};

export default defineConfig(({ mode }) => {
  if (mode === "production") {
    return production;
  } else {
    return development;
  }
});

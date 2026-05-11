import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Estas opciones ahora van en la raíz del objeto, no dentro de experimental */
  serverExternalPackages: ['tailwindcss'],
};

export default nextConfig;
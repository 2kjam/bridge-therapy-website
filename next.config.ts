import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      {
        source: "/:path+/index.html",
        destination: "/:path+/",
        permanent: true,
      },
      {
        source: "/children-families",
        destination: "/#family-services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

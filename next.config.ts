import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'snhltnwklxscjle7.public.blob.vercel-storage.com',
        pathname: '/Mitho-cha/**',
      },
    ],
  },
};

export default withNextIntl({
  ...nextConfig,
});

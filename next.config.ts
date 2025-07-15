import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    // This is required to allow the Next.js dev server to accept requests from the
    // preview server in this Cloud Workstation.
    allowedDevOrigins: [
      '*.cluster-hf4yr35cmnbd4vhbxvfvc6cp5q.cloudworkstations.dev',
    ],
  },
};

export default nextConfig;

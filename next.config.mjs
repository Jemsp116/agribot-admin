/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'firebasestorage.googleapis.com',
              port: '',
              pathname: '/v0/b/wcb-2-35ea3.appspot.com/o/**',
            },
            {
              protocol: 'https',
              hostname: 'sloth-bear-conservation.s3.eu-north-1.amazonaws.com',
              port: '',
              pathname: '/**',
            },
          ],
      },
};

export default nextConfig;

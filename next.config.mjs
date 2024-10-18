/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   staleTimes: {
  //     dynamic: 0,
  //   },
  // },
  images: {
    domains: ["res.cloudinary.com"],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS domains
      },
    ],
  },
};

export default nextConfig;

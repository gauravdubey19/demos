/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "*" }] },
  // matcher: ["/((?!api|_next|.*\\..*).*)"],
};

export default nextConfig;

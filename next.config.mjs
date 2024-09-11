/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    allowFutureImage: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      "img.freepik.com",
      "res.cloudinary.com",
      "encrypted-tbn0.gstatic.com",
      "raw.githubusercontent.com",
      "skillicons.dev",
      "philipoyelegbin.com.ng",
    ],
  },
  env: {
    // API_URL: "https://moonshot-api.vercel.app",
  },
};

export default nextConfig;

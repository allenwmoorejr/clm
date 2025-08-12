
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { typedRoutes: true },
  env: {
    NEXT_PUBLIC_CHANNEL_ID: process.env.CHANNEL_ID,
    NEXT_PUBLIC_PASTOR_IMG: process.env.NEXT_PUBLIC_PASTOR_IMG,
    NEXT_PUBLIC_PASTOR_VIDEO_ID: process.env.NEXT_PUBLIC_PASTOR_VIDEO_ID
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "yt3.ggpht.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" }
    ]
  }
}
export default nextConfig

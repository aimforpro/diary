/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // 페이지 라우팅 설정
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // 기본 페이지 설정
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/page',
      },
    ]
  },
}

module.exports = nextConfig 
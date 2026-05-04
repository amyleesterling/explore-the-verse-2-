/** @type {import('next').NextConfig} */
const isPagesBuild = process.env.GITHUB_PAGES === "true";
const repoBasePath = "/explore-the-verse-2-";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: isPagesBuild ? repoBasePath : "",
  assetPrefix: isPagesBuild ? `${repoBasePath}/` : "",
};

export default nextConfig;

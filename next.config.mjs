/** @type {import('next').NextConfig} */

// Set this to the exact GitHub repo name — GitHub Pages serves project
// sites from https://<user>.github.io/<repo-name>/, so all asset URLs
// need that prefix. Leave the dev server (`npm run dev`) unaffected.
const repoName = 'figs-catalog';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const basePath = isGithubActions ? `/${repoName}` : '';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath,
  assetPrefix: isGithubActions ? `/${repoName}/` : '',
  // Exposed to client code as process.env.NEXT_PUBLIC_BASE_PATH — see lib/basePath.js.
  // Needed because next/image does NOT auto-prefix basePath onto `src` when
  // images.unoptimized is true (a known gap in static export + basePath).
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

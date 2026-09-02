/** @type {import('next').NextConfig} */

// Set this to the exact GitHub repo name — GitHub Pages serves project
// sites from https://<user>.github.io/<repo-name>/, so all asset URLs
// need that prefix. Leave the dev server (`npm run dev`) unaffected.
const repoName = 'figs-catalog';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isGithubActions ? `/${repoName}` : '',
  assetPrefix: isGithubActions ? `/${repoName}/` : '',
};

export default nextConfig;

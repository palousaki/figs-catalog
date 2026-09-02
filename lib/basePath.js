// next/image does not auto-prefix basePath onto a local `src` when
// images.unoptimized is true (see next.config.mjs), so any image path from
// /public must be run through this before being passed to <Image src=...>.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(path) {
  return `${BASE_PATH}${path}`;
}

// Resolve a public-asset URL accounting for the deploy basePath.
// Dev:    NEXT_PUBLIC_BASE_PATH = ''        → asset('/hero.jpg')  => '/hero.jpg'
// Pages:  NEXT_PUBLIC_BASE_PATH = '/wyke'   → asset('/hero.jpg')  => '/wyke/hero.jpg'
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

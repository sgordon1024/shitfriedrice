/**
 * Asset path prefix helper
 *
 * On GitHub Pages the site lives at /shitfriedrice/ so all
 * image src paths need that prefix. Locally it's just "".
 * Next.js basePath handles <Link> and router, but raw <Image src="">
 * with unoptimized images doesn't get prefixed automatically.
 */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function asset(path: string): string {
  return `${basePath}${path}`;
}

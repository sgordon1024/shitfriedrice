/**
 * Sanity Studio Page — Placeholder for static export
 */

export function generateStaticParams() {
  return [{ tool: [] }];
}

export default function StudioPage() {
  return (
    <main id="main-content" className="pt-24 pb-20 px-4 text-center">
      <h1 className="font-[family-name:var(--font-bebas)] text-4xl text-sfr-cream mb-4">
        SANITY STUDIO
      </h1>
      <p className="text-sfr-cream/60">
        The Sanity Studio runs on the full Next.js server.
        Run <code className="text-sfr-green">npm run dev</code> locally to access it.
      </p>
    </main>
  );
}

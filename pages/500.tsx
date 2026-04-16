import Link from 'next/link';

export default function Custom500Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5 py-16 text-text">
      <div className="w-full max-w-[560px] rounded border border-border bg-surface p-8 text-center">
        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Server Error</div>
        <h1 className="font-display text-[34px] font-bold tracking-[-0.03em] text-text">500</h1>
        <p className="mt-3 text-[14px] leading-[1.7] text-muted">
          Something went wrong while loading this page.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-[3px] bg-accent px-4 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#3AADF5]"
          >
            Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}

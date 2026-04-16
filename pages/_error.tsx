import type { NextPageContext } from 'next';
import Link from 'next/link';

type ErrorPageProps = {
  statusCode: number;
};

function getMessage(statusCode: number) {
  if (statusCode === 404) {
    return 'The page you requested could not be found.';
  }
  if (statusCode >= 500) {
    return 'Something went wrong while loading this page.';
  }
  return 'An unexpected error occurred.';
}

export default function ErrorPage({ statusCode }: ErrorPageProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-5 py-16 text-text">
      <div className="w-full max-w-[560px] rounded border border-border bg-surface p-8 text-center">
        <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.1em] text-accent">Request Error</div>
        <h1 className="font-display text-[34px] font-bold tracking-[-0.03em] text-text">{statusCode}</h1>
        <p className="mt-3 text-[14px] leading-[1.7] text-muted">{getMessage(statusCode)}</p>
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

ErrorPage.getInitialProps = ({ res, err }: NextPageContext): ErrorPageProps => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 500;
  return {
    statusCode,
  };
};

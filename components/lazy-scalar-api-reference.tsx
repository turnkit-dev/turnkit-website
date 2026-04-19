'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

const ScalarApiReference = dynamic(
  () => import('@/components/scalar-api-reference').then((module) => module.ScalarApiReference),
  {
    ssr: false,
    loading: () => <ScalarReferencePlaceholder />,
  },
);

interface LazyScalarApiReferenceProps {
  specUrl: string;
}

export function LazyScalarApiReference({ specUrl }: LazyScalarApiReferenceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) {
      return;
    }

    const node = containerRef.current;

    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }

        setShouldLoad(true);
        observer.disconnect();
      },
      {
        rootMargin: '600px 0px',
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [shouldLoad]);

  return <div ref={containerRef}>{shouldLoad ? <ScalarApiReference specUrl={specUrl} /> : <ScalarReferencePlaceholder />}</div>;
}

function ScalarReferencePlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="flex min-h-[480px] items-center justify-center bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_100%)] px-6 py-16"
    >
      <div className="w-full max-w-[520px]">
        <div className="mb-4 h-4 w-32 rounded bg-[rgba(15,23,42,0.08)]" />
        <div className="mb-3 h-10 w-full rounded bg-[rgba(15,23,42,0.06)]" />
        <div className="mb-8 h-10 w-full rounded bg-[rgba(15,23,42,0.05)]" />
        <div className="space-y-3">
          <div className="h-14 w-full rounded bg-[rgba(15,23,42,0.05)]" />
          <div className="h-14 w-full rounded bg-[rgba(15,23,42,0.05)]" />
          <div className="h-14 w-full rounded bg-[rgba(15,23,42,0.05)]" />
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect } from 'react';

export function PostLoginHistorySync() {
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has('__tkb')) {
      url.searchParams.delete('__tkb');
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }
  }, []);

  return null;
}

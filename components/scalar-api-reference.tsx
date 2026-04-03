'use client';

import '@scalar/api-reference-react/style.css';
import { ApiReferenceReact } from '@scalar/api-reference-react';

interface ScalarApiReferenceProps {
  specUrl: string;
}

export function ScalarApiReference({ specUrl }: ScalarApiReferenceProps) {
  return (
    <div className="scalar-theme-turnkit">
      <ApiReferenceReact
        configuration={{
          url: specUrl,
          searchHotKey: 'k',
          hideDarkModeToggle: true,
          hideClientButton: true,
        }}
      />
    </div>
  );
}

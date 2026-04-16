import { headers } from 'next/headers';

export async function JsonLd({ id, data }: { id: string; data: unknown }) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  return <script id={id} nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

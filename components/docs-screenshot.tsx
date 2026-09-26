export function DocsScreenshot({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="mb-8 overflow-hidden rounded-[6px] border border-border bg-surface">
      <a href={src} target="_blank" rel="noreferrer" aria-label={`Open screenshot: ${caption}`}>
        {/* These editor captures use their native dimensions so labels remain readable. */}
        <img src={src} alt={alt} className="mx-auto block max-h-[640px] max-w-full object-contain" loading="lazy" />
      </a>
      <figcaption className="border-t border-border px-4 py-3 text-[12px] leading-[1.6] text-muted">{caption}</figcaption>
    </figure>
  );
}

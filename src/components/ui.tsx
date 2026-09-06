import Image from "next/image";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-4xl px-6 sm:px-10 lg:px-14 ${className}`}>
      {children}
    </div>
  );
}

export function Figure({
  src,
  alt,
  caption,
  ratio = "16 / 9",
  priority = false,
  sizes = "(min-width: 1024px) 56rem, 100vw",
  className = "",
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <div
        className="relative overflow-hidden rounded-xl border border-line bg-raised"
        style={{ aspectRatio: ratio }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
      {caption && (
        <figcaption className="mt-3 text-[0.8125rem] leading-relaxed text-ink-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function Rule() {
  return <hr className="border-0 border-t border-line" />;
}

/** Joins whatever metadata exists with a separator, and renders nothing if none does. */
export function MetaLine({
  parts,
  className = "eyebrow",
}: {
  parts: (string | undefined | false)[];
  className?: string;
}) {
  const shown = parts.filter((p): p is string => Boolean(p && p.trim()));
  if (shown.length === 0) return null;
  return <p className={className}>{shown.join(" · ")}</p>;
}

import Link from "next/link";
import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center pt-24">
      <Container>
        <p className="eyebrow">404</p>
        <h1 className="display mt-5 text-[clamp(2rem,5vw,3rem)]">This page does not exist.</h1>
        <p className="mt-5 max-w-md leading-relaxed text-ink-soft">
          The link may be out of date, or the page may have moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-ink px-5 py-2.5 text-sm text-canvas transition hover:bg-clay"
        >
          Back home
        </Link>
      </Container>
    </div>
  );
}

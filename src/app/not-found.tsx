import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-mono text-primary tracking-widest uppercase mb-4">404</p>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Page not found</h1>
      <p className="text-muted-foreground mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
      >
        Back home
      </Link>
    </main>
  );
}

"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-mono text-primary tracking-widest uppercase mb-4">Error</p>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Something went wrong</h1>
      <p className="text-muted-foreground mb-8">An unexpected error occurred.</p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
      >
        Try again
      </button>
    </main>
  );
}

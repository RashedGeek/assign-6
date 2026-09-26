import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 px-6 py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-warning">
          404
        </p>
        <h1 className="text-3xl font-black uppercase">Page not found</h1>
        <p className="text-base-content/60">
          That page doesn&apos;t exist, or the lift got moved.
        </p>
        <Link href="/" className="btn btn-warning mt-4">
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}
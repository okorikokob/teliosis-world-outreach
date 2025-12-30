import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-screen-md px-4 py-24 text-center space-y-6">
      <h1 className="h1 text-[--color-primary]">Page not found</h1>
      <p className="text-sm opacity-80 max-w-prose mx-auto">
        The page you are looking for may have been moved or does not exist. Check the URL or return to the homepage.
      </p>
      <Link href="/" className="btn-base btn-primary btn-md inline-flex">Go Home</Link>
    </div>
  );
}

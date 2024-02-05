import Link from 'next/link';

// TODO: implement landing page
export default function Home() {
  return (
    <main className="py-88 container flex flex-col gap-4 px-8">
      <h1 className="text-4xl">Coming soon</h1>
      <p>
        For now, try checking out the <Link href="/devtools">devtools</Link>
      </p>
    </main>
  );
}

import Link from 'next/link';

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div>
        <h1 className="text-4xl md:text-5xl font-bold">United Charity Network</h1>
        <p className="mt-4 text-lg text-gray-700">
          A nonprofit social platform that connects charities, donors, and volunteers in real time —
          routing resources where they’re needed most and making impact visible.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/feed" className="btn btn-primary">Explore the Impact Feed</Link>
          <Link href="/charities" className="btn border border-gray-300 bg-white hover:bg-gray-50">Find Charities</Link>
        </div>
        <p className="mt-6 text-sm text-gray-600">Tagline: <em>Where Good Deeds Go Viral.</em></p>
      </div>
      <div className="card p-6">
        <h2 className="text-xl font-semibold">Transparency at the Core</h2>
        <ul className="mt-3 list-disc pl-6 text-gray-700">
          <li>Verified charity profiles with linked social accounts</li>
          <li>Real-time needs & offers in the Impact Feed</li>
          <li>Donation hub (funds, goods, volunteer time)</li>
          <li>Public impact dashboard (coming soon)</li>
        </ul>
      </div>
    </div>
  );
}

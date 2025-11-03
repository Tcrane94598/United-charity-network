import Link from 'next/link';
import Logo from './Logo';

export default function Nav() {
  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3"><Logo /></Link>
        <div className="flex items-center gap-4">
          <Link href="/feed" className="hover:underline">Impact Feed</Link>
          <Link href="/charities" className="hover:underline">Charities</Link>
          <Link href="/about" className="hover:underline">About</Link>
        </div>
      </div>
    </nav>
  );
}

import { Post, Charity } from '@prisma/client';
import dayjs from 'dayjs';
import clsx from 'clsx';
import Link from 'next/link';

export default function PostCard({ post, charity }: { post: Post, charity?: Charity | null }) {
  const badgeMap: Record<Post['kind'], string> = {
    NEED: 'bg-red-100 text-red-800 border-red-200',
    OFFER: 'bg-green-100 text-green-800 border-green-200',
    UPDATE: 'bg-blue-100 text-blue-800 border-blue-200'
  };

  return (
    <article className="card p-4">
      <div className="flex items-center justify-between">
        <span className={clsx('px-2 py-1 rounded text-xs border', badgeMap[post.kind])}>{post.kind}</span>
        <time className="text-sm text-gray-500">{dayjs(post.createdAt).format('MMM D, YYYY h:mm A')}</time>
      </div>
      <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
      <p className="mt-1 text-gray-700 whitespace-pre-line">{post.body}</p>
      <div className="mt-3 flex flex-wrap gap-2 text-sm text-gray-600">
        {post.location && <span>📍 {post.location}</span>}
        {post.tags?.map((t) => (
          <span key={t} className="px-2 py-0.5 bg-gray-100 rounded border border-gray-200">#{t}</span>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        {charity ? (
          <Link href={`/charities/${charity.slug}`} className="text-[color:var(--brand)] hover:underline">
            {charity.name}
          </Link>
        ) : <span className="text-gray-500">Unattributed</span>}
        {post.contactEmail && <a href={`mailto:${post.contactEmail}`} className="hover:underline">Contact</a>}
      </div>
    </article>
  );
}

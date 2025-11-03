'use client';
import { useState } from 'react';

export default function NewPostForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kind, setKind] = useState<'NEED'|'OFFER'|'UPDATE'>('NEED');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [location, setLocation] = useState('');
  const [tags, setTags] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          kind, title, body, location,
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
          contactEmail
        })
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to post');
      window.location.reload();
    } catch (err:any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex gap-2">
        <select value={kind} onChange={e=>setKind(e.target.value as any)} className="border rounded px-2 py-1">
          <option value="NEED">NEED</option>
          <option value="OFFER">OFFER</option>
          <option value="UPDATE">UPDATE</option>
        </select>
        <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Location (optional)" className="flex-1 border rounded px-2 py-1" />
      </div>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full border rounded px-2 py-1" required />
      <textarea value={body} onChange={e=>setBody(e.target.value)} placeholder="Details" className="w-full border rounded px-2 py-1 min-h-[100px]" required />
      <input value={tags} onChange={e=>setTags(e.target.value)} placeholder="Comma-separated tags (e.g., food, winter)" className="w-full border rounded px-2 py-1" />
      <input value={contactEmail} onChange={e=>setContactEmail(e.target.value)} placeholder="Contact email (shown publicly)" className="w-full border rounded px-2 py-1" />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button disabled={loading} className="btn btn-primary w-full">{loading ? 'Posting...' : 'Post to Feed'}</button>
    </form>
  );
}

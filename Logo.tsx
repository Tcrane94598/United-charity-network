export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="inline-block w-3 h-3 rounded-full bg-[color:var(--brand)]" />
      <span className="inline-block w-3 h-3 rounded-full bg-[color:var(--accent)]" />
      <span className="inline-block w-3 h-3 rounded-full bg-[color:var(--gold)]" />
      <span className="font-semibold">United Charity Network</span>
    </div>
  );
}

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative w-10 h-10 rounded-xl bg-brand-black dark:bg-white flex items-center justify-center overflow-hidden group">
        <span className="font-display font-extrabold text-brand-orange text-lg tracking-tight">
          DE
        </span>
        <span className="absolute inset-0 bg-brand-orange/0 group-hover:bg-brand-orange/15 transition-colors" />
      </div>
      <div className="leading-tight">
        <div className="font-display font-bold text-neutral-900 dark:text-white">
          Damage<span className="text-brand-orange">.</span>Expert
        </div>
        <div className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
          Procena štete · Niš
        </div>
      </div>
    </div>
  );
}

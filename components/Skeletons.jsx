export function CardSkeleton() {
  return (
    <div className="card bg-base-200 h-[26rem] animate-pulse">
      <div className="h-52 bg-base-300 rounded-t-2xl" />
      <div className="p-5 space-y-3"><div className="h-4 w-1/3 bg-base-300 rounded" /><div className="h-6 w-3/4 bg-base-300 rounded" /><div className="h-4 w-1/2 bg-base-300 rounded" /><div className="h-10 w-full bg-base-300 rounded-full mt-6" /></div>
    </div>
  );
}
export const GridSkeleton = ({ n = 6 }) => (
  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: n }).map((_, i) => <CardSkeleton key={i} />)}</div>
);
export function EmptyState({ title, text, children }) {
  return (
    <div className="text-center py-16 border-2 border-dashed border-base-300 rounded-2xl">
      <div className="text-5xl mb-3">🎬</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="opacity-70 mt-1 mb-5">{text}</p>
      {children}
    </div>
  );
}

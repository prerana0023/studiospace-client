import { FiAperture } from 'react-icons/fi';
export default function Loading() {
  return (
    <div className="min-h-[60vh] grid place-items-center">
      <div className="flex flex-col items-center gap-3">
        <FiAperture size={48} className="text-primary animate-spin" style={{ animationDuration: '2s' }} />
        <p className="font-semibold opacity-70">Setting up the lights…</p>
      </div>
    </div>
  );
}

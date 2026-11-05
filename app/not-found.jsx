import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap py-20 text-center">
      <svg viewBox="0 0 300 200" className="w-72 mx-auto" aria-hidden="true">
        <polygon points="150,30 90,190 210,190" fill="#fbbf24" opacity="0.25" />
        <rect x="125" y="10" width="50" height="30" rx="6" fill="#f59e0b" />
        <rect x="145" y="38" width="10" height="20" fill="#78716c" />
        <circle cx="150" cy="150" r="22" fill="none" stroke="#f59e0b" strokeWidth="4" />
        <text x="150" y="158" textAnchor="middle" fontSize="22" fontWeight="800" fill="#f59e0b">404</text>
      </svg>
      <h1 className="section-title mt-6">Cut! This scene is missing.</h1>
      <p className="section-sub mx-auto">The page you are looking for has wrapped up or never made it to the set.</p>
      <Link href="/" className="btn-brand mt-8">Return to Home</Link>
    </div>
  );
}

import Link from 'next/link';

const values = [
  ['Creators first', 'Every feature starts with a simple question: does this help someone make their work sooner?'],
  ['Fair and transparent', 'Hourly rates and deposits are shown upfront, with no hidden fees at checkout.'],
  ['Community-powered', 'Studios are listed by real hosts and rated by the creators who used them.'],
];

export default function About() {
  return (
    <div className="wrap py-14 max-w-4xl">
      <h1 className="section-title">About StudioSpace</h1>
      <p className="mt-4 text-lg opacity-80 leading-relaxed">StudioSpace started with a frustrating afternoon: a photographer, a podcaster and a band all hunting for a good space on short notice, and all stuck in endless message threads. We built a marketplace where studio owners list their rooms and creators book them by the hour with clear pricing.</p>
      <div className="grid gap-6 md:grid-cols-3 mt-10">
        {values.map(([t, d]) => <div key={t} className="card bg-base-200 p-6 h-full"><h2 className="font-bold text-lg text-primary">{t}</h2><p className="text-sm opacity-80 mt-2">{d}</p></div>)}
      </div>
      <Link href="/studios" className="btn-brand mt-10">Find a Studio</Link>
    </div>
  );
}

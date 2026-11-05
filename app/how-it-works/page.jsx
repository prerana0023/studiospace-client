import Link from 'next/link';

const items = [
  ['1. Discover Spaces', 'Browse photo studios, sound stages, podcast lounges, music suites and art workshops. Use search, category and price sorting to narrow things down.'],
  ['2. Select Shoot Hours', 'Open a listing, check amenities, reviews and host details, then pick a date and start and end time. The total price updates as you choose.'],
  ['3. Book Instantly', 'Send your booking request. It starts as Pending until the host confirms, and we block clashes with already confirmed sessions so nobody gets double-booked.'],
  ['4. Create & Produce', 'Show up at your booked time, shoot, record or run your workshop. Your booking moves to Completed once the session is done.'],
];
const hosts = ['Create a free account and add your studio with photos, rate and amenities.', 'Review incoming requests from your dashboard and confirm the ones that fit.', 'Edit or remove your listing whenever your availability changes.'];

export default function HowItWorks() {
  return (
    <div className="wrap py-14">
      <h1 className="section-title">How StudioSpace Works</h1>
      <p className="section-sub">Booking a creative space should take minutes, not days of emails.</p>
      <div className="grid gap-6 md:grid-cols-2 mt-10">
        {items.map(([t, d]) => <div key={t} className="card bg-base-200 p-6"><h2 className="font-bold text-xl text-primary">{t}</h2><p className="mt-2 opacity-80">{d}</p></div>)}
      </div>
      <h2 className="section-title mt-16">For Hosts</h2>
      <ul className="mt-4 space-y-2 list-disc pl-6 opacity-80">{hosts.map((h) => <li key={h}>{h}</li>)}</ul>
      <Link href="/studios" className="btn-brand mt-10">Start Exploring</Link>
    </div>
  );
}

'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiCamera, FiFilm, FiMic, FiMusic, FiPenTool, FiSearch, FiClock, FiCheckCircle, FiVideo, FiShield, FiUserCheck, FiTool, FiHeadphones } from 'react-icons/fi';
import HeroSlider from '@/components/HeroSlider';
import StudioCard from '@/components/StudioCard';
import { GridSkeleton, EmptyState } from '@/components/Skeletons';
import { api } from '@/lib/api';

const cats = [
  { label: 'Photo Studios', value: 'Photo Studio', icon: FiCamera },
  { label: 'Sound Stages', value: 'Film Stage', icon: FiFilm },
  { label: 'Podcast Rooms', value: 'Podcast Lounge', icon: FiMic },
  { label: 'Music Suites', value: 'Music Suite', icon: FiMusic },
  { label: 'Art Workshops', value: 'Workshop', icon: FiPenTool },
];
const steps = [
  { t: 'Discover Spaces', d: 'Filter by category, price and location to find your fit.', i: FiSearch },
  { t: 'Select Shoot Hours', d: 'Pick a date and the exact hours you need.', i: FiClock },
  { t: 'Book Instantly', d: 'Send your request with transparent pricing upfront.', i: FiCheckCircle },
  { t: 'Create & Produce', d: 'Show up, set up and make something great.', i: FiVideo },
];
const guarantees = [
  { t: 'Liability Protection', d: 'Every confirmed booking is covered by our host and guest protection policy.', i: FiShield },
  { t: 'Verified Profiles', d: 'Hosts and creators are verified so you always know who you are working with.', i: FiUserCheck },
  { t: 'Equipment Safety', d: 'Listed gear is checked and rated by the creators who used it.', i: FiTool },
  { t: '24/7 Host Support', d: 'Our support crew is on call day and night when plans change.', i: FiHeadphones },
];

export default function Home() {
  const [studios, setStudios] = useState(null);
  useEffect(() => {
    api('/studios?sort=rating&limit=6').then(setStudios).catch(() => setStudios([]));
  }, []);

  return (
    <>
      <HeroSlider />

      <section className="wrap py-16">
        <h2 className="section-title">Featured Studios</h2>
        <p className="section-sub">Our top-rated creative spaces, loved by filmmakers, photographers and musicians.</p>
        <div className="mt-8">
          {!studios ? <GridSkeleton /> : studios.length === 0 ? (
            <EmptyState title="No studios yet" text="Be the first to list a creative space."><Link href="/add-studio" className="btn-brand">Add a Studio</Link></EmptyState>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{studios.map((s) => <StudioCard key={s._id} s={s} />)}</div>
          )}
        </div>
      </section>

      <section className="bg-base-200 py-16">
        <div className="wrap">
          <h2 className="section-title">Browse by Studio Category</h2>
          <p className="section-sub">Jump straight to the type of space your project needs.</p>
          <div className="mt-8 grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {cats.map((c) => (
              <Link key={c.value} href={`/studios?category=${encodeURIComponent(c.value)}`} className="card bg-base-100 hover:bg-primary hover:text-primary-content transition shadow h-40 items-center justify-center text-center gap-3">
                <c.icon size={36} /><span className="font-bold">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16">
        <h2 className="section-title">How Booking Works</h2>
        <p className="section-sub">From first search to final cut in four simple steps.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.t} className="card bg-base-200 p-6 h-full">
              <div className="flex items-center justify-between"><s.i size={30} className="text-primary" /><span className="text-4xl font-black opacity-20">0{i + 1}</span></div>
              <h3 className="font-bold text-lg mt-4">{s.t}</h3><p className="opacity-70 text-sm mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-neutral text-neutral-content py-16">
        <div className="wrap">
          <h2 className="section-title">Host Guarantee &amp; Creator Support</h2>
          <p className="mt-2 max-w-2xl opacity-70">Book and host with confidence. Here is what we stand behind.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guarantees.map((g) => (
              <div key={g.t} className="rounded-2xl border border-white/10 p-6 h-full">
                <g.i size={30} className="text-primary" /><h3 className="font-bold text-lg mt-4">{g.t}</h3><p className="text-sm opacity-70 mt-1">{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

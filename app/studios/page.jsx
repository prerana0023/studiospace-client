'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import StudioCard from '@/components/StudioCard';
import { GridSkeleton, EmptyState } from '@/components/Skeletons';
import { api } from '@/lib/api';
import { CATEGORIES } from '@/lib/constants';

export default function Explore() {
  const [studios, setStudios] = useState(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('rating');
  const [ready, setReady] = useState(false);

  // pre-select category coming from Home / Footer
  useEffect(() => {
    setCategory(new URLSearchParams(window.location.search).get('category') || '');
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    setStudios(null);
    const t = setTimeout(() => {
      const q = new URLSearchParams({ sort });
      if (search) q.set('search', search);
      if (category) q.set('category', category);
      api(`/studios?${q}`).then(setStudios).catch(() => setStudios([]));
    }, 300);
    return () => clearTimeout(t);
  }, [search, category, sort, ready]);

  return (
    <div className="wrap py-12">
      <h1 className="section-title">Explore Studios</h1>
      <p className="section-sub">Search and filter spaces for your next production.</p>
      <div className="mt-6 grid gap-3 md:grid-cols-[1fr_14rem_14rem]">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or location" className="input input-bordered w-full" />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="select select-bordered">
          <option value="">All categories</option>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="select select-bordered">
          <option value="rating">Top rated</option><option value="newest">Newest</option>
          <option value="priceLow">Price: low to high</option><option value="priceHigh">Price: high to low</option>
        </select>
      </div>
      <div className="mt-8">
        {!studios ? <GridSkeleton /> : studios.length === 0 ? (
          <EmptyState title="No studios match your search" text="Try different keywords or clear the filters.">
            <button className="btn-brand" onClick={() => { setSearch(''); setCategory(''); }}>Clear filters</button>
          </EmptyState>
        ) : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{studios.map((s) => <StudioCard key={s._id} s={s} />)}</div>}
      </div>
    </div>
  );
}

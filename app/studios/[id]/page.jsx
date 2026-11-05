'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { FiMapPin, FiStar, FiUsers, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import BookingModal from '@/components/BookingModal';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';

export default function StudioDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [s, setS] = useState(null);
  const [missing, setMissing] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => { api(`/studios/${id}`).then(setS).catch(() => setMissing(true)); }, [id]);

  const book = () => {
    if (!user) { toast.error('Please log in to book a studio.'); return router.push(`/login?next=/studios/${id}`); }
    setOpen(true);
  };

  if (missing) return <div className="wrap py-24 text-center"><h1 className="section-title">Studio not found</h1><Link href="/studios" className="btn-brand mt-6">Back to studios</Link></div>;
  if (!s) return <div className="wrap py-12 animate-pulse"><div className="h-96 bg-base-300 rounded-2xl" /><div className="h-8 w-1/2 bg-base-300 rounded mt-6" /></div>;

  const gallery = s.gallery?.length ? s.gallery : [s.image];
  return (
    <div className="wrap py-10">
      <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} className="rounded-2xl h-72 md:h-[28rem]">
        {gallery.map((g, i) => <SwiperSlide key={i}><img src={g} alt={`${s.title} ${i + 1}`} className="w-full h-full object-cover" /></SwiperSlide>)}
      </Swiper>

      <div className="grid gap-8 lg:grid-cols-[1fr_22rem] mt-8">
        <div>
          <span className="badge badge-primary">{s.category}</span>
          <h1 className="section-title mt-2">{s.title}</h1>
          <div className="flex flex-wrap gap-4 mt-3 opacity-80">
            <span className="flex items-center gap-1"><FiMapPin /> {s.location}</span>
            <span className="flex items-center gap-1"><FiStar /> {s.rating ? s.rating.toFixed(1) : 'New'}</span>
            <span className="flex items-center gap-1"><FiUsers /> Up to {s.maxCapacity} people</span>
          </div>
          <h2 className="font-bold text-xl mt-8">About this space</h2>
          <p className="mt-2 opacity-80 leading-relaxed">{s.overview}</p>
          <h2 className="font-bold text-xl mt-8">Amenities</h2>
          <ul className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {s.amenities?.map((a) => <li key={a} className="flex items-center gap-2"><FiCheck className="text-primary" />{a}</li>)}
          </ul>
          <h2 className="font-bold text-xl mt-8">Reviews</h2>
          <div className="mt-3 space-y-3">
            {s.reviews?.length ? s.reviews.map((r, i) => (
              <div key={i} className="rounded-xl bg-base-200 p-4">
                <div className="flex justify-between"><b>{r.name}</b><span className="flex items-center gap-1 text-sm"><FiStar className="text-primary" />{r.rating}</span></div>
                <p className="text-sm opacity-80 mt-1">{r.comment}</p>
              </div>
            )) : <p className="opacity-70">No reviews yet. Be the first to book and review.</p>}
          </div>
        </div>

        <aside className="card bg-base-200 p-6 h-fit lg:sticky lg:top-24 gap-4">
          <p className="text-3xl font-extrabold text-primary">${s.hourlyRate}<span className="text-base font-medium opacity-70"> / hr</span></p>
          <p className="text-sm opacity-70">Security deposit: ${s.securityDeposit || 0}</p>
          <button onClick={book} className="btn-brand w-full">Book Workspace Now</button>
          <div className="divider my-0" />
          <div className="flex items-center gap-3">
            <img src={s.ownerPhoto || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(s.ownerName)}`} alt={s.ownerName} className="w-12 h-12 rounded-full object-cover" />
            <div><p className="text-xs opacity-60">Hosted by</p><p className="font-bold">{s.ownerName}</p><p className="text-xs opacity-60">{s.ownerEmail}</p></div>
          </div>
        </aside>
      </div>
      <BookingModal studio={s} open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

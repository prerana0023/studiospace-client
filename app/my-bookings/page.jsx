'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PrivateRoute from '@/components/PrivateRoute';
import { ConfirmModal } from '@/components/Modal';
import { EmptyState } from '@/components/Skeletons';
import { api } from '@/lib/api';
import { STATUS_STYLE } from '@/lib/constants';

export default function MyBookings() {
  const [list, setList] = useState(null);
  const [target, setTarget] = useState(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => { api('/bookings/mine').then(setList).catch((e) => { toast.error(e.message); setList([]); }); }, []);

  const cancel = async () => {
    setBusy(true);
    try {
      await api(`/bookings/${target._id}/status`, { method: 'PATCH', body: { status: 'Cancelled' } });
      setList(list.map((b) => (b._id === target._id ? { ...b, status: 'Cancelled' } : b)));
      toast.success('Booking cancelled.');
      setTarget(null);
    } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };

  return (
    <PrivateRoute>
      <div className="wrap py-12">
        <h1 className="section-title">My Bookings</h1>
        <div className="mt-8">
          {!list ? <div className="h-64 bg-base-300 rounded-2xl animate-pulse" /> : list.length === 0 ? (
            <EmptyState title="No bookings yet" text="Find a studio and reserve your first session."><Link href="/studios" className="btn-brand">Explore Studios</Link></EmptyState>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {list.map((b) => (
                <div key={b._id} className="card card-side bg-base-200 shadow">
                  <img src={b.studioImage} alt={b.studioTitle} className="w-32 sm:w-44 object-cover rounded-l-2xl" />
                  <div className="card-body p-5">
                    <div className="flex items-start justify-between gap-2"><h3 className="font-bold line-clamp-1">{b.studioTitle}</h3><span className={`badge ${STATUS_STYLE[b.status]}`}>{b.status}</span></div>
                    <p className="text-sm opacity-70">{b.location}</p>
                    <p className="text-sm">{b.date} · {b.startTime}–{b.endTime} ({b.hours} hr)</p>
                    <p className="font-bold text-primary">Total ${b.total}</p>
                    {b.status === 'Pending' && <button onClick={() => setTarget(b)} className="btn btn-sm btn-error btn-outline mt-1 w-fit">Cancel Booking</button>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <ConfirmModal open={!!target} title="Cancel this booking?" message={`Your pending request for “${target?.studioTitle}” on ${target?.date} will be cancelled.`} confirmText="Yes, cancel" busy={busy} onConfirm={cancel} onCancel={() => setTarget(null)} />
      </div>
    </PrivateRoute>
  );
}

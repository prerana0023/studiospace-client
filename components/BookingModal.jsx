'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Modal } from './Modal';
import { api } from '@/lib/api';

const toMin = (t) => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };

export default function BookingModal({ studio, open, onClose }) {
  const router = useRouter();
  const [f, setF] = useState({ date: '', startTime: '10:00', endTime: '12:00' });
  const [busy, setBusy] = useState(false);
  const hours = f.startTime && f.endTime ? Math.max(0, (toMin(f.endTime) - toMin(f.startTime)) / 60) : 0;
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api('/bookings', { method: 'POST', body: { studioId: studio._id, ...f } });
      toast.success('Booking request sent! Status: Pending.');
      onClose();
      router.push('/my-bookings');
    } catch (err) { toast.error(err.message); }
    finally { setBusy(false); }
  };

  return (
    <Modal open={open} onClose={onClose} title={`Book ${studio.title}`}>
      <form onSubmit={submit} className="space-y-3">
        <label className="form-control"><span className="label-text mb-1">Date</span>
          <input type="date" required min={new Date().toISOString().slice(0, 10)} value={f.date} onChange={set('date')} className="input input-bordered" /></label>
        <div className="grid grid-cols-2 gap-3">
          <label className="form-control"><span className="label-text mb-1">Start</span><input type="time" required value={f.startTime} onChange={set('startTime')} className="input input-bordered" /></label>
          <label className="form-control"><span className="label-text mb-1">End</span><input type="time" required value={f.endTime} onChange={set('endTime')} className="input input-bordered" /></label>
        </div>
        <div className="rounded-xl bg-base-200 p-4 text-sm space-y-1">
          <div className="flex justify-between"><span>${studio.hourlyRate} × {hours} hr</span><span className="font-bold">${hours * studio.hourlyRate}</span></div>
          <div className="flex justify-between opacity-70"><span>Refundable security deposit</span><span>${studio.securityDeposit || 0}</span></div>
        </div>
        <button className="btn-brand w-full" disabled={busy || hours < 1}>{busy && <span className="loading loading-spinner loading-sm" />}Confirm Booking Request</button>
      </form>
    </Modal>
  );
}

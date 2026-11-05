'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PrivateRoute from '@/components/PrivateRoute';
import { EmptyState } from '@/components/Skeletons';
import { api } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import { STATUS_STYLE } from '@/lib/constants';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    Promise.all([api('/my-studios'), api('/bookings/mine'), api('/bookings/requests')])
      .then(([l, b, r]) => { setStats({ listings: l.length, bookings: b.length }); setRequests(r); })
      .catch((e) => { toast.error(e.message); setRequests([]); });
  }, []);

  const setStatus = async (id, status) => {
    try {
      await api(`/bookings/${id}/status`, { method: 'PATCH', body: { status } });
      setRequests((rs) => rs.map((r) => (r._id === id ? { ...r, status } : r)));
      toast.success(`Booking marked ${status}.`);
    } catch (e) { toast.error(e.message); }
  };

  return (
    <PrivateRoute>
      <div className="wrap py-12">
        <h1 className="section-title">Welcome back, {user?.name?.split(' ')[0]}</h1>
        <div className="grid gap-4 sm:grid-cols-3 mt-8">
          <div className="card bg-base-200 p-6"><p className="opacity-70 text-sm">My listings</p><p className="text-4xl font-extrabold text-primary">{stats?.listings ?? '–'}</p></div>
          <div className="card bg-base-200 p-6"><p className="opacity-70 text-sm">My bookings</p><p className="text-4xl font-extrabold text-primary">{stats?.bookings ?? '–'}</p></div>
          <div className="card bg-base-200 p-6"><p className="opacity-70 text-sm">Incoming requests</p><p className="text-4xl font-extrabold text-primary">{requests?.length ?? '–'}</p></div>
        </div>

        <h2 className="font-bold text-2xl mt-12 mb-4">Booking Requests for My Studios</h2>
        {!requests ? <div className="h-40 bg-base-300 rounded-2xl animate-pulse" /> : requests.length === 0 ? (
          <EmptyState title="No requests yet" text="When creators book your studios, they will appear here."><Link href="/add-studio" className="btn-brand">Add a Studio</Link></EmptyState>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-base-300">
            <table className="table">
              <thead><tr><th>Studio</th><th>Guest</th><th>When</th><th>Total</th><th>Status</th><th className="text-right">Action</th></tr></thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r._id}>
                    <td className="font-semibold">{r.studioTitle}</td><td>{r.guestName}</td>
                    <td className="whitespace-nowrap">{r.date}<br /><span className="text-xs opacity-70">{r.startTime}–{r.endTime}</span></td>
                    <td>${r.total}</td><td><span className={`badge ${STATUS_STYLE[r.status]}`}>{r.status}</span></td>
                    <td className="text-right whitespace-nowrap">
                      {r.status === 'Pending' && <><button onClick={() => setStatus(r._id, 'Confirmed')} className="btn btn-xs btn-success mr-1">Confirm</button><button onClick={() => setStatus(r._id, 'Cancelled')} className="btn btn-xs btn-error btn-outline">Decline</button></>}
                      {r.status === 'Confirmed' && <button onClick={() => setStatus(r._id, 'Completed')} className="btn btn-xs btn-info">Mark Completed</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}

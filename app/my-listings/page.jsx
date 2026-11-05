'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PrivateRoute from '@/components/PrivateRoute';
import { ConfirmModal } from '@/components/Modal';
import { EmptyState } from '@/components/Skeletons';
import { api } from '@/lib/api';

export default function MyListings() {
  const [list, setList] = useState(null);
  const [target, setTarget] = useState(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => { api('/my-studios').then(setList).catch((e) => { toast.error(e.message); setList([]); }); }, []);

  const remove = async () => {
    setBusy(true);
    try {
      await api(`/studios/${target._id}`, { method: 'DELETE' });
      setList(list.filter((s) => s._id !== target._id));
      toast.success('Studio deleted.');
      setTarget(null);
    } catch (e) { toast.error(e.message); } finally { setBusy(false); }
  };

  return (
    <PrivateRoute>
      <div className="wrap py-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="section-title">My Studio Listings</h1>
          <Link href="/add-studio" className="btn-brand">+ Add Studio</Link>
        </div>
        <div className="mt-8">
          {!list ? <div className="h-64 bg-base-300 rounded-2xl animate-pulse" /> : list.length === 0 ? (
            <EmptyState title="You have no listings yet" text="Share your creative space with the community."><Link href="/add-studio" className="btn-brand">List your first studio</Link></EmptyState>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-base-300">
              <table className="table">
                <thead><tr><th>Studio</th><th>Category</th><th>Rate</th><th>Location</th><th className="text-right">Actions</th></tr></thead>
                <tbody>
                  {list.map((s) => (
                    <tr key={s._id}>
                      <td><div className="flex items-center gap-3"><img src={s.image} alt={s.title} className="w-16 h-12 rounded-lg object-cover" /><b>{s.title}</b></div></td>
                      <td><span className="badge badge-primary">{s.category}</span></td>
                      <td>${s.hourlyRate}/hr</td><td>{s.location}</td>
                      <td className="text-right whitespace-nowrap">
                        <Link href={`/studios/edit/${s._id}`} className="btn btn-sm btn-outline mr-2">Update</Link>
                        <button onClick={() => setTarget(s)} className="btn btn-sm btn-error btn-outline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        <ConfirmModal open={!!target} title="Delete this studio?" message={`“${target?.title}” will be permanently removed. This cannot be undone.`} confirmText="Yes, delete" busy={busy} onConfirm={remove} onCancel={() => setTarget(null)} />
      </div>
    </PrivateRoute>
  );
}

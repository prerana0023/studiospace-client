'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import PrivateRoute from '@/components/PrivateRoute';
import StudioForm from '@/components/StudioForm';
import { api } from '@/lib/api';

export default function EditStudio() {
  const { id } = useParams();
  const router = useRouter();
  const [s, setS] = useState(null);
  useEffect(() => { api(`/studios/${id}`).then(setS).catch(() => { toast.error('Studio not found.'); router.replace('/my-listings'); }); }, [id, router]);
  const update = async (data) => {
    await api(`/studios/${id}`, { method: 'PUT', body: data });
    toast.success('Studio updated!');
    router.push('/my-listings');
  };
  return (
    <PrivateRoute>
      <div className="wrap py-12 max-w-4xl">
        <h1 className="section-title mb-8">Update Studio</h1>
        {!s ? <div className="h-96 bg-base-300 rounded-2xl animate-pulse" /> : <StudioForm initial={s} onSubmit={update} submitLabel="Save Changes" />}
      </div>
    </PrivateRoute>
  );
}

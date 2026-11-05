'use client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import PrivateRoute from '@/components/PrivateRoute';
import StudioForm from '@/components/StudioForm';
import { api } from '@/lib/api';

export default function AddStudio() {
  const router = useRouter();
  const create = async (data) => {
    await api('/studios', { method: 'POST', body: data });
    toast.success('Studio listed successfully!');
    router.push('/my-listings');
  };
  return (
    <PrivateRoute>
      <div className="wrap py-12 max-w-4xl">
        <h1 className="section-title">Add New Studio</h1>
        <p className="section-sub mb-8">Tell creators about your space. You can edit it any time.</p>
        <StudioForm onSubmit={create} submitLabel="Publish Studio" />
      </div>
    </PrivateRoute>
  );
}

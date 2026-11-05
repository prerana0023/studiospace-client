'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth';
import { uploadImage } from '@/lib/api';
import { CATEGORIES, AMENITIES } from '@/lib/constants';
 const Field = ({ label, children }) => <label className="form-control w-full"><span className="label-text font-medium mb-1">{label}</span>{children}</label>;
export default function StudioForm({ initial, onSubmit, submitLabel }) {
  const { user } = useAuth();
  const [f, setF] = useState({ title: '', category: CATEGORIES[0], hourlyRate: '', securityDeposit: '', maxCapacity: '', location: '', image: '', overview: '', amenities: [], ...initial });
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const toggle = (a) => setF({ ...f, amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a] });

  const upload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try { const url = await uploadImage(file); setF((p) => ({ ...p, image: url })); toast.success('Image uploaded!'); }
    catch (err) { toast.error(err.message); }
    finally { setUploading(false); }
  };

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try { await onSubmit(f); } catch (err) { toast.error(err.message); } finally { setBusy(false); }
  };



  return (
    <form onSubmit={submit} className="grid gap-5 md:grid-cols-2">
      <Field label="Studio Title"><input required value={f.title} onChange={set('title')} className="input input-bordered" /></Field>
      <Field label="Category"><select value={f.category} onChange={set('category')} className="select select-bordered">{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</select></Field>
      <Field label="Hourly Rate ($)"><input required type="number" min="1" value={f.hourlyRate} onChange={set('hourlyRate')} className="input input-bordered" /></Field>
      <Field label="Security Deposit ($)"><input required type="number" min="0" value={f.securityDeposit} onChange={set('securityDeposit')} className="input input-bordered" /></Field>
      <Field label="Max Capacity"><input required type="number" min="1" value={f.maxCapacity} onChange={set('maxCapacity')} className="input input-bordered" /></Field>
      <Field label="Location / Address"><input required value={f.location} onChange={set('location')} className="input input-bordered" /></Field>
      <Field label="Image URL"><input required type="url" value={f.image} onChange={set('image')} placeholder="https://..." className="input input-bordered" /></Field>
      <Field label="…or upload image (imgbb)"><input type="file" accept="image/*" onChange={upload} className="file-input file-input-bordered" disabled={uploading} /></Field>
      <div className="md:col-span-2">
        <span className="label-text font-medium">Amenities</span>
        <div className="mt-2 flex flex-wrap gap-3">
          {AMENITIES.map((a) => (
            <label key={a} className="label cursor-pointer gap-2 rounded-full border border-base-300 px-3 py-1">
              <input type="checkbox" className="checkbox checkbox-primary checkbox-sm" checked={f.amenities.includes(a)} onChange={() => toggle(a)} /><span className="label-text">{a}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="md:col-span-2"><Field label="Detailed Overview"><textarea required rows={5} value={f.overview} onChange={set('overview')} className="textarea textarea-bordered" /></Field></div>
      <Field label="Host Name"><input readOnly value={initial?.ownerName || user?.name || ''} className="input input-bordered opacity-70" /></Field>
      <Field label="Host Email"><input readOnly value={initial?.ownerEmail || user?.email || ''} className="input input-bordered opacity-70" /></Field>
      <div className="md:col-span-2"><button className="btn-brand w-full md:w-auto" disabled={busy || uploading}>{busy && <span className="loading loading-spinner loading-sm" />}{submitLabel}</button></div>
    </form>
  );
}

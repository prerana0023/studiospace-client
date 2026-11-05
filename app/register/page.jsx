'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';
import GoogleButton from '@/components/GoogleButton';

export default function Register() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.target));
    if (f.password.length < 6) return setError('Password must be at least 6 characters.');
    if (!/[A-Z]/.test(f.password)) return setError('Password must contain an uppercase letter.');
    if (!/[a-z]/.test(f.password)) return setError('Password must contain a lowercase letter.');
    setBusy(true); setError('');
    try {
      await api('/auth/register', { method: 'POST', body: f });
      toast.success('Account created! Please log in.');
      router.push('/login');
    } catch (err) { setError(err.message); toast.error(err.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="wrap py-14 grid place-items-center">
      <div className="card bg-base-200 w-full max-w-md shadow-xl"><form onSubmit={submit} className="card-body gap-3">
        <h1 className="section-title text-center">Create Your Account</h1>
        <input name="name" required placeholder="Full name" className="input input-bordered w-full" />
        <input name="email" type="email" required placeholder="Email" className="input input-bordered w-full" />
        <input name="photoURL" type="url" placeholder="Photo URL" className="input input-bordered w-full" />
        <input name="password" type="password" required placeholder="Password" className="input input-bordered w-full" />
        {error && <p className="text-error text-sm">{error}</p>}
        <button className="btn-brand w-full" disabled={busy}>{busy && <span className="loading loading-spinner loading-sm" />}Register</button>
        <div className="divider text-xs">OR</div>
        <GoogleButton onDone={() => router.replace('/')} />
        <p className="text-sm text-center mt-2">Already registered? <Link href="/login" className="link link-primary font-semibold">Login</Link></p>
      </form></div>
    </div>
  );
}

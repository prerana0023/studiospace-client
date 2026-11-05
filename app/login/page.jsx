'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth';
import GoogleButton from '@/components/GoogleButton';

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const dest = () => new URLSearchParams(window.location.search).get('next') || '/';

  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    setBusy(true); setError('');
    try {
      await login(f.get('email'), f.get('password'));
      toast.success('Welcome back!');
      router.replace(dest());
    } catch (err) { setError(err.message); toast.error(err.message); }
    finally { setBusy(false); }
  };

  return (
    <div className="wrap py-14 grid place-items-center">
      <div className="card bg-base-200 w-full max-w-md shadow-xl"><form onSubmit={submit} className="card-body gap-3">
        <h1 className="section-title text-center">Login to StudioSpace</h1>
        <input name="email" type="email" required placeholder="Email" className="input input-bordered w-full" />
        <input name="password" type="password" required placeholder="Password" className="input input-bordered w-full" />
        {error && <p className="text-error text-sm">{error}</p>}
        <span className="text-sm link link-hover self-end" onClick={() => toast('Password reset is coming soon.', { icon: '🔧' })}>Forgot Password?</span>
        <button className="btn-brand w-full" disabled={busy}>{busy && <span className="loading loading-spinner loading-sm" />}Login</button>
        <div className="divider text-xs">OR</div>
        <GoogleButton onDone={() => router.replace(dest())} />
        <p className="text-sm text-center mt-2">New here? <Link href="/register" className="link link-primary font-semibold">Create an account</Link></p>
      </form></div>
    </div>
  );
}

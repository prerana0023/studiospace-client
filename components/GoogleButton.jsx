'use client';
import { GoogleLogin } from '@react-oauth/google';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth';

export default function GoogleButton({ onDone }) {
  const { googleLogin } = useAuth();
  if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) return null;
  return (
    <div className="flex justify-center">
      <GoogleLogin
        onSuccess={async (r) => {
          try { await googleLogin(r.credential); toast.success('Signed in with Google!'); onDone(); }
          catch (e) { toast.error(e.message); }
        }}
        onError={() => toast.error('Google sign-in was cancelled or failed.')}
      />
    </div>
  );
}

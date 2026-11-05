'use client';
import { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '@/lib/auth';

export default function Providers({ children }) {
  const tree = (
    <AuthProvider>
      {children}
      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
    </AuthProvider>
  );
  const id = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  return id ? <GoogleOAuthProvider clientId={id}>{tree}</GoogleOAuthProvider> : tree;
}

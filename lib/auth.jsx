'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from './api';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from the HTTPOnly cookie on every full page load (fixes "redirected to login on reload")
  useEffect(() => {
    api('/auth/me').then((d) => setUser(d.user)).catch(() => setUser(null)).finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const d = await api('/auth/login', { method: 'POST', body: { email, password } });
    setUser(d.user);
  };
  const googleLogin = async (credential) => {
    const d = await api('/auth/google', { method: 'POST', body: { credential } });
    setUser(d.user);
  };
  const logout = async () => {
    await api('/auth/logout', { method: 'POST' });
    setUser(null);
  };
  return <Ctx.Provider value={{ user, loading, login, googleLogin, logout }}>{children}</Ctx.Provider>;
}

'use client';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('studiolight');
  useEffect(() => setTheme(document.documentElement.getAttribute('data-theme') || 'studiolight'), []);
  const toggle = () => {
    const next = theme === 'studiolight' ? 'studiodark' : 'studiolight';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setTheme(next);
  };
  return (
    <button onClick={toggle} className="btn btn-ghost btn-circle" aria-label="Toggle theme">
      {theme === 'studiolight' ? <FiMoon size={20} /> : <FiSun size={20} />}
    </button>
  );
}

'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FiAperture, FiMenu } from 'react-icons/fi';
import { useAuth } from '@/lib/auth';
import ThemeToggle from './ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/studios', label: 'Explore Studios' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About Us' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const active = (h) => (h === '/' ? pathname === '/' : pathname.startsWith(h));

  const onLogout = async () => {
    await logout();
    toast.success('Logged out. See you soon!');
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-40 bg-base-100/90 backdrop-blur border-b border-base-300">
      <div className="wrap navbar px-4">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle"><FiMenu size={22} /></label>
            <ul tabIndex={0} className="menu dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-56 border border-base-300">
              {links.map((l) => <li key={l.href}><Link href={l.href} className={active(l.href) ? 'active' : ''}>{l.label}</Link></li>)}
            </ul>
          </div>
          <Link href="/" className="flex items-center gap-2 text-2xl font-extrabold tracking-tight">
            <FiAperture className="text-primary" size={28} /> StudioSpace
          </Link>
        </div>
        <nav className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={`font-medium border-b-2 rounded-none ${active(l.href) ? 'border-primary text-primary' : 'border-transparent'}`}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {loading ? <span className="loading loading-spinner loading-sm" /> : user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar" title={user.name}>
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`} alt={user.name} />
                </div>
              </label>
              <ul tabIndex={0} className="menu dropdown-content mt-3 z-50 p-2 shadow bg-base-100 rounded-box w-60 border border-base-300">
                <li className="menu-title text-base-content">{user.name}</li>
                <li><Link href="/dashboard">Dashboard</Link></li>
                <li><Link href="/add-studio">Add New Studio</Link></li>
                <li><Link href="/my-listings">My Studio Listings</Link></li>
                <li><Link href="/my-bookings">My Bookings</Link></li>
                <li><button onClick={onLogout} className="text-error">Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost rounded-full">Login</Link>
              <Link href="/register" className="btn-brand">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

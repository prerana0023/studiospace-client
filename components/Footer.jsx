'use client';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FiAperture } from 'react-icons/fi';
import { FaXTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6';
import { CATEGORIES } from '@/lib/constants';

export default function Footer() {
  const subscribe = (e) => {
    e.preventDefault();
    toast.success('You are subscribed! Watch your inbox for fresh studio drops.');
    e.target.reset();
  };
  return (
    <footer className="bg-neutral text-neutral-content mt-16">
      <div className="wrap py-12 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-2xl font-extrabold"><FiAperture className="text-primary" size={28} /> StudioSpace</div>
          <p className="mt-3 text-sm opacity-70">Our mission is to make every creative space bookable in minutes, so creators spend less time searching and more time making.</p>
          <div className="flex gap-3 mt-4 text-xl">
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X"><FaXTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li><Link href="/">Home</Link></li><li><Link href="/studios">Explore Studios</Link></li>
            <li><Link href="/how-it-works">How It Works</Link></li><li><Link href="/about">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Popular Categories</h3>
          <ul className="space-y-2 text-sm opacity-80">
            {CATEGORIES.map((c) => <li key={c}><Link href={`/studios?category=${encodeURIComponent(c)}`}>{c}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-3">Newsletter</h3>
          <form onSubmit={subscribe} className="join w-full">
            <input type="email" required placeholder="you@email.com" className="input input-bordered join-item w-full text-base-content" />
            <button className="btn btn-primary join-item">Join</button>
          </form>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs opacity-60">
        © {new Date().getFullYear()} StudioSpace. All rights reserved. Use of this platform is subject to our Terms &amp; Privacy Policy.
      </div>
    </footer>
  );
}

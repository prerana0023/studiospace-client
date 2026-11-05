# StudioSpace — Peer-to-Peer Creative Workspace & Production Studio Sharing Platform

**Live Site:**https://studiospace-client-tau.vercel.app
**Server Repo:** https://github.com/prerana0023/studiospace-server

## Key Features
- Hero slider, dynamic Featured Studios (top 6 by rating from MongoDB) and category browsing that pre-selects filters
- Full studio CRUD with ownership checks, imgbb image upload and confirmation modals
- Booking system with Pending → Confirmed → Completed / Cancelled flow and host dashboard
- Double-booking prevention: overlapping times against Confirmed bookings are rejected with a clear message
- JWT in HTTPOnly cookies (401 on unauthorized mutations), Google login, light/dark theme toggle, toast notifications, skeleton loaders and empty states

## Tech Stack
Next.js 14 (App Router), Tailwind CSS + DaisyUI, Swiper.js, react-hot-toast, React Icons, Express.js, MongoDB, JWT, bcryptjs

## Local Setup
```bash
git clone <client-repo-url> && cd studiospace-client
npm install
cp .env.example .env.local   # set API_URL, Google client id, imgbb key
npm run dev                  # http://localhost:3000
```
Run the server repo first (`npm run seed` creates demo data).

## Examiner Test Credentials
| Role | Email | Password |
| --- | --- | --- |
| Creator / Guest | examiner@studiospace.com | Studio123 |
| Host (owns seeded studios) | host@studiospace.com | Studio123 |

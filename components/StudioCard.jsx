import Link from 'next/link';
import { FiMapPin, FiStar } from 'react-icons/fi';

export default function StudioCard({ s }) {
  return (
    <div className="card bg-base-200 shadow-md hover:shadow-xl transition h-full">
      <figure className="relative h-52 shrink-0">
        <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
        <span className="badge badge-primary absolute top-3 left-3">{s.category}</span>
        <span className="badge badge-neutral gap-1 absolute top-3 right-3"><FiStar /> {s.rating ? s.rating.toFixed(1) : 'New'}</span>
      </figure>
      <div className="card-body p-5 flex flex-col">
        <h3 className="card-title text-lg line-clamp-1">{s.title}</h3>
        <p className="flex items-center gap-1 text-sm opacity-70"><FiMapPin /> {s.location}</p>
        <p className="text-2xl font-extrabold text-primary mt-1">${s.hourlyRate}<span className="text-sm font-medium opacity-70"> / hr</span></p>
        <div className="mt-auto pt-3"><Link href={`/studios/${s._id}`} className="btn-brand w-full">View Details</Link></div>
      </div>
    </div>
  );
}

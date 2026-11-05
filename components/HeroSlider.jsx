'use client';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const slides = [
  { img: 'https://picsum.photos/seed/hero1/1600/800', title: 'Find the Perfect Studio for Your Next Shoot', text: 'Cyc walls, sound stages and loft spaces from verified hosts, bookable by the hour.' },
  { img: 'https://picsum.photos/seed/hero2/1600/800', title: 'Record, Podcast, Produce — Without the Overhead', text: 'Pro-grade music suites and podcast lounges with the gear already set up.' },
  { img: 'https://picsum.photos/seed/hero3/1600/800', title: 'Turn Your Empty Space Into Income', text: 'List your studio, set your rate and get bookings from creators near you.' },
];

export default function HeroSlider() {
  return (
    <Swiper modules={[Autoplay, Pagination, EffectFade]} effect="fade" autoplay={{ delay: 4500, disableOnInteraction: false }} pagination={{ clickable: true }} loop className="h-[28rem] md:h-[34rem]">
      {slides.map((s) => (
        <SwiperSlide key={s.title}>
          <div className="relative h-full w-full">
            <img src={s.img} alt={s.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="relative wrap h-full flex flex-col justify-center text-white">
              <h1 className="text-3xl md:text-5xl font-extrabold max-w-2xl leading-tight">{s.title}</h1>
              <p className="mt-4 max-w-xl text-white/80 md:text-lg">{s.text}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/studios" className="btn-brand">Explore Studios</Link>
                <Link href="/studios" className="btn rounded-full px-6 btn-outline text-white hover:bg-white hover:text-black">Host Your Space</Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

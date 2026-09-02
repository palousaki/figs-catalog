'use client';

import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import products from '@/data/products.json';

const featured = products.filter((p) => p.inStock).slice(0, 4);

export default function HomePage() {
  const { tx, lang } = useLanguage();
  const t = tx.home;

  const provenance = [
    { icon: 'sun', label: t.provenance1 },
    { icon: 'leaf', label: t.provenance2 },
    { icon: 'seal', label: t.provenance3 },
    { icon: 'house', label: t.provenance4 },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[560px] md:min-h-[640px]">
        <div className="flex flex-col justify-center gap-7 px-6 md:px-16 py-16">
          <div className="flex items-center gap-3">
            <svg width="34" height="14" viewBox="0 0 34 14" fill="none" aria-hidden="true">
              <path d="M1 10 Q 17 -2 33 10" stroke="currentColor" className="text-brand" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-xs md:text-sm tracking-[0.15em] uppercase text-brand-hover font-semibold">
              {t.heroEyebrow}
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-6xl leading-[1.08] text-ink max-w-lg">
            {t.heroTitle}
            <br />
            <em className="text-brand-hover not-italic md:italic">{t.heroHighlight}</em>
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-ink-soft max-w-md">
            {t.heroSubtitle}
          </p>
          <div className="flex items-center gap-7 mt-2">
            <Link
              href="/products"
              className="px-8 py-4 bg-brand text-white rounded font-semibold hover:bg-brand-hover transition text-center"
            >
              {t.shopNow}
            </Link>
            <a
              href="#story"
              className="text-ink font-medium border-b border-line pb-0.5 hover:border-ink transition"
            >
              {t.learnMore} ↓
            </a>
          </div>
        </div>
        <div className="relative min-h-[320px] md:min-h-0 overflow-hidden bg-[linear-gradient(150deg,oklch(74%_0.09_70)_0%,oklch(58%_0.11_45)_45%,oklch(34%_0.08_322)_100%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(85%_0.06_80_/_0.5),transparent_55%)]" />
          <svg className="absolute top-9 right-9 opacity-80" width="90" height="90" viewBox="0 0 90 90" fill="none" aria-hidden="true">
            <path d="M45 10 C 20 25, 15 55, 45 82 C 75 55, 70 25, 45 10 Z" stroke="oklch(98% 0.01 85)" strokeWidth="1.2" />
            <path d="M45 14 L45 78" stroke="oklch(98% 0.01 85)" strokeWidth="1" />
          </svg>
          <div className="absolute left-11 bottom-14 w-32 h-32 rounded-full border border-white/70 flex items-center justify-center -rotate-6">
            <span className="font-script text-xl md:text-2xl font-semibold text-white text-center leading-tight px-2">
              {t.heroStamp}
            </span>
          </div>
        </div>
      </section>

      {/* Provenance strip */}
      <section className="bg-ink py-7 px-6 md:px-16">
        <div className="container mx-auto flex flex-wrap items-center justify-center md:justify-between gap-x-8 gap-y-4">
          {provenance.map(({ icon, label }, i) => (
            <div key={label} className="flex items-center gap-3">
              <ProvenanceIcon icon={icon} />
              <span className="text-parchment text-sm whitespace-nowrap">{label}</span>
              {i < provenance.length - 1 && (
                <span className="hidden md:block w-px h-5 bg-white/20 ml-5" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Story teaser */}
      <section id="story" className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center px-6 py-20 md:py-28 scroll-mt-24">
        <div className="relative h-72 md:h-96 rounded-md overflow-hidden order-2 md:order-1">
          <Image
            src="/story-figs-drying.jpg"
            alt={lang === 'el' ? 'Σύκα απλωμένα να στεγνώσουν στον ήλιο' : 'Figs laid out to dry in the sun'}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-5 order-1 md:order-2">
          <span className="text-xs tracking-[0.15em] uppercase text-olive font-semibold">{t.storyEyebrow}</span>
          <h2 className="font-serif text-3xl md:text-4xl text-ink">{t.storyTitle}</h2>
          <p className="text-ink-soft leading-relaxed">{t.storyText}</p>
          <Link href="/about" className="text-ink font-semibold border-b border-ink w-fit">
            {t.storyLink} →
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-8 md:py-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="flex flex-col gap-3">
              <span className="text-xs tracking-[0.15em] uppercase text-brand-hover font-semibold">{t.shopEyebrow}</span>
              <h2 className="font-serif text-3xl md:text-4xl text-ink">{t.featuredTitle}</h2>
            </div>
            <p className="text-sm text-ink-soft max-w-xs md:text-right">{t.featuredSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {featured.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
          <Link href="/products" className="text-brand-hover font-medium hover:text-brand transition-colors">
            {t.viewAll} →
          </Link>
        </div>
      </section>

      {/* Certification band */}
      <section className="bg-ink py-20 px-6 flex flex-col items-center text-center gap-6">
        <svg width="100" height="100" viewBox="0 0 118 118" fill="none" aria-hidden="true">
          <circle cx="59" cy="59" r="55" stroke="white" strokeWidth="1" />
          <circle cx="59" cy="59" r="46" stroke="white" strokeWidth="0.6" />
          <g stroke="white" strokeWidth="1.1" strokeLinecap="round">
            <line x1="59" y1="42" x2="59" y2="76" /><line x1="42" y1="59" x2="76" y2="59" />
            <line x1="47" y1="47" x2="71" y2="71" /><line x1="71" y1="47" x2="47" y2="71" />
          </g>
        </svg>
        <span className="text-xs tracking-[0.2em] uppercase text-white/70">{t.certEyebrow}</span>
        <h2 className="font-serif italic text-2xl md:text-4xl text-white max-w-2xl leading-snug">
          {t.certHeadline}
        </h2>
        <p className="text-sm text-white/60 tracking-wide">{t.certNote}</p>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 md:py-28 px-6 flex flex-col items-center text-center gap-8">
        <h2 className="font-serif text-3xl md:text-5xl text-ink">{t.ctaTitle}</h2>
        <p className="text-ink-soft -mt-4">{t.ctaSubtitle}</p>
        <Link
          href="/products"
          className="px-9 py-4 bg-brand text-white rounded font-semibold hover:bg-brand-hover transition"
        >
          {t.startShopping}
        </Link>
      </section>
    </div>
  );
}

function ProvenanceIcon({ icon }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'white', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  if (icon === 'sun') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </svg>
    );
  }
  if (icon === 'leaf') {
    return (
      <svg {...common}>
        <path d="M12 3 C 6 6, 5 14, 12 21 C 19 14, 18 6, 12 3 Z" />
        <path d="M12 6v13" />
      </svg>
    );
  }
  if (icon === 'seal') {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12.5l2.5 2.5L16 9.5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M3 11.5L12 4l9 7.5" />
      <path d="M5.5 10v9.5h13V10" />
    </svg>
  );
}

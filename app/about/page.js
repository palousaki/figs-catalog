'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { withBasePath } from '@/lib/basePath';

export default function AboutPage() {
  const { tx } = useLanguage();
  const t = tx.about;

  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-light py-20 px-6 text-center">
        <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">{t.title}</h1>
        <p className="text-ink-soft max-w-2xl mx-auto text-lg">{t.subtitle}</p>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-80 rounded-md overflow-hidden">
            <Image src={withBasePath('/dried_figs.png')} alt="Our Figs" fill className="object-cover" />
          </div>
          <div>
            <h2 className="font-serif text-3xl text-ink mb-4">{t.passionTitle}</h2>
            <p className="text-ink-soft mb-4 leading-relaxed">{t.p1}</p>
            <p className="text-ink-soft mb-4 leading-relaxed">{t.p2}</p>
            <p className="text-ink-soft leading-relaxed">{t.p3}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-brand-light/40 px-6">
        <div className="container mx-auto">
          <h2 className="font-serif text-3xl text-ink text-center mb-12">
            {t.valuesTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {t.values.map(({ emoji, title, desc }) => (
              <div key={title} className="p-6 bg-white border border-line rounded-md text-center">
                <div className="text-4xl mb-3">{emoji}</div>
                <h3 className="font-semibold text-lg text-ink mb-2">{title}</h3>
                <p className="text-ink-soft text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center">
        <h2 className="font-serif text-3xl text-ink mb-4">{t.ctaTitle}</h2>
        <Link
          href="/products"
          className="inline-block px-8 py-3.5 bg-brand text-white rounded font-semibold hover:bg-brand-hover transition text-lg"
        >
          {t.ctaButton}
        </Link>
      </section>
    </div>
  );
}

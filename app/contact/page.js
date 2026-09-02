'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ContactModal from '@/components/ContactModal';

export default function ContactPage() {
  const { tx } = useLanguage();
  const t = tx.contact;
  const [open, setOpen] = useState(false);

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">{t.title}</h1>
        <p className="text-ink-soft text-lg">{t.subtitle}</p>
      </div>

      <div className="max-w-md mx-auto">
        <h2 className="text-xl font-bold text-ink mb-6 text-center">{t.infoTitle}</h2>
        <div className="space-y-4 mb-10">
          {t.info.map(({ emoji, label, value }) => (
            <div key={label} className="flex gap-4 p-4 bg-white border border-line rounded-xl">
              <span className="text-2xl flex-shrink-0" aria-hidden="true">{emoji}</span>
              <div>
                <p className="font-medium text-ink">{label}</p>
                <p className="text-ink-soft text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block w-full py-3.5 bg-brand text-white font-semibold rounded text-center hover:bg-brand-hover transition"
        >
          {t.emailCta}
        </button>
      </div>

      {open && <ContactModal onClose={() => setOpen(false)} />}
    </div>
  );
}

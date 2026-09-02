'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { tx } = useLanguage();
  const f = tx.footer;

  return (
    <footer className="bg-ink text-parchment mt-10">
      <div className="container mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <h3 className="font-serif italic text-2xl mb-3">Helios Figs</h3>
            <p className="text-parchment/60 text-sm leading-relaxed max-w-xs">{f.tagline}</p>
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-wide uppercase mb-4 text-parchment/80">{f.quickLinks}</h3>
            <div className="flex flex-col gap-2.5">
              <Link href="/products" className="text-parchment/60 hover:text-parchment text-sm transition-colors">
                {tx.nav.products}
              </Link>
              <Link href="/about" className="text-parchment/60 hover:text-parchment text-sm transition-colors">
                {tx.nav.about}
              </Link>
              <Link href="/contact" className="text-parchment/60 hover:text-parchment text-sm transition-colors">
                {tx.nav.contact}
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-semibold tracking-wide uppercase mb-4 text-parchment/80">{f.customerService}</h3>
            <div className="flex flex-col gap-2.5 text-parchment/60 text-sm">
              <p>{tx.contact.info[0].value}</p>
              <p>{tx.contact.info[1].value}</p>
            </div>
          </div>
        </div>
        <div className="border-t border-parchment/10 pt-6 text-center text-parchment/40 text-sm">
          <p>{f.rights}</p>
        </div>
      </div>
    </footer>
  );
}

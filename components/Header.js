'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

function BarsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function Header() {
  const { lang, switchLang, tx } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-parchment border-b border-line sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 md:px-10 py-5">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif italic text-2xl text-ink"
        >
          <Image src="/logo_no_bg.png" alt="Helios Figs" width={32} height={32} />
          <span>Helios Figs</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          <Link href="/products" className="text-ink hover:text-brand-hover text-sm font-medium tracking-wide uppercase transition-colors">
            {tx.nav.products}
          </Link>
          <Link href="/about" className="text-ink hover:text-brand-hover text-sm font-medium tracking-wide uppercase transition-colors">
            {tx.nav.about}
          </Link>
          <Link href="/contact" className="text-ink hover:text-brand-hover text-sm font-medium tracking-wide uppercase transition-colors">
            {tx.nav.contact}
          </Link>

          {/* Language switcher */}
          <div className="flex items-center gap-1.5 text-sm text-ink-soft">
            <button
              onClick={() => switchLang('en')}
              aria-pressed={lang === 'en'}
              className={`transition ${lang === 'en' ? 'text-ink font-semibold' : 'hover:text-ink'}`}
            >
              EN
            </button>
            <span>/</span>
            <button
              onClick={() => switchLang('el')}
              aria-pressed={lang === 'el'}
              className={`transition ${lang === 'el' ? 'text-ink font-semibold' : 'hover:text-ink'}`}
            >
              ΕΛ
            </button>
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-ink-soft">
            <button
              onClick={() => switchLang('en')}
              aria-pressed={lang === 'en'}
              className={`transition ${lang === 'en' ? 'text-ink font-semibold' : ''}`}
            >
              EN
            </button>
            <span>/</span>
            <button
              onClick={() => switchLang('el')}
              aria-pressed={lang === 'el'}
              className={`transition ${lang === 'el' ? 'text-ink font-semibold' : ''}`}
            >
              ΕΛ
            </button>
          </div>
          <button
            className="text-ink"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <XIcon /> : <BarsIcon />}
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <nav className="md:hidden bg-parchment border-t border-line px-6 py-4 flex flex-col gap-4">
          <Link href="/products" className="text-ink text-sm font-medium uppercase tracking-wide" onClick={() => setMenuOpen(false)}>
            {tx.nav.products}
          </Link>
          <Link href="/about" className="text-ink text-sm font-medium uppercase tracking-wide" onClick={() => setMenuOpen(false)}>
            {tx.nav.about}
          </Link>
          <Link href="/contact" className="text-ink text-sm font-medium uppercase tracking-wide" onClick={() => setMenuOpen(false)}>
            {tx.nav.contact}
          </Link>
        </nav>
      )}
    </header>
  );
}

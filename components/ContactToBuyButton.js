'use client';

import { useLanguage } from '@/context/LanguageContext';

const CONTACT_EMAIL = 'elenipalou@gmail.com';

export default function ContactToBuyButton({ product, variant = 'detail' }) {
  const { lang, tx } = useLanguage();
  const name = product.name[lang] || product.name.en;

  const subject =
    lang === 'el'
      ? `Ενδιαφέρον για: ${name} (${product.weight})`
      : `Interest in: ${name} (${product.weight})`;
  const body =
    lang === 'el'
      ? `Γεια σας,\n\nΘα ήθελα να ρωτήσω για το προϊόν "${name}" (${product.weight}).\n\n`
      : `Hello,\n\nI'd like to ask about "${name}" (${product.weight}).\n\n`;

  const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  if (!product.inStock) {
    const label = variant === 'compact' ? tx.card.outOfStock : tx.product.outOfStock;
    return (
      <span
        className={
          variant === 'compact'
            ? 'flex-shrink-0 px-3 py-1.5 rounded text-xs font-semibold uppercase border border-line text-ink-soft opacity-60 cursor-not-allowed'
            : 'inline-block px-8 py-3.5 rounded font-semibold text-base text-center bg-line text-ink-soft opacity-60 cursor-not-allowed'
        }
      >
        {label}
      </span>
    );
  }

  if (variant === 'compact') {
    return (
      <a
        href={href}
        onClick={(e) => e.stopPropagation()}
        className="flex-shrink-0 px-3 py-1.5 rounded text-xs font-semibold uppercase transition border border-ink text-ink hover:bg-ink hover:text-white"
      >
        {tx.card.contactToBuy}
      </a>
    );
  }

  return (
    <a
      href={href}
      className="inline-block px-8 py-3.5 rounded font-semibold text-base text-center transition bg-brand hover:bg-brand-hover text-white"
    >
      {tx.product.contactToBuy}
    </a>
  );
}

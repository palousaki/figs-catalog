'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import ContactModal from '@/components/ContactModal';

export default function ContactToBuyButton({ product, variant = 'detail' }) {
  const { tx } = useLanguage();
  const [open, setOpen] = useState(false);

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

  return (
    <>
      {variant === 'compact' ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setOpen(true);
          }}
          className="flex-shrink-0 px-3 py-1.5 rounded text-xs font-semibold uppercase transition border border-ink text-ink hover:bg-ink hover:text-white"
        >
          {tx.card.contactToBuy}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-block px-8 py-3.5 rounded font-semibold text-base text-center transition bg-brand hover:bg-brand-hover text-white"
        >
          {tx.product.contactToBuy}
        </button>
      )}
      {open && <ContactModal product={product} onClose={() => setOpen(false)} />}
    </>
  );
}

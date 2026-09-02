'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import ContactToBuyButton from '@/components/ContactToBuyButton';

export default function ProductCard({ product }) {
  const { lang, tx } = useLanguage();

  const name = product.name[lang] || product.name.en;
  const description = product.description[lang] || product.description.en;

  return (
    <div className="bg-white border border-line rounded-md hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col">
      <Link href={`/products/${product.id}`} className="block relative w-full h-48">
        <Image
          src={product.image}
          alt={name}
          fill
          className="object-cover"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-ink/50 flex items-center justify-center">
            <span className="text-white font-semibold text-lg">
              {tx.card.outOfStock}
            </span>
          </div>
        )}
        <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 40 40" aria-hidden="true">
            <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" className="text-fig" strokeWidth="1.3" />
            <g stroke="currentColor" className="text-fig" strokeWidth="1" strokeLinecap="round">
              <line x1="20" y1="10" x2="20" y2="30" /><line x1="10" y1="20" x2="30" y2="20" />
              <line x1="13" y1="13" x2="27" y2="27" /><line x1="27" y1="13" x2="13" y2="27" />
            </g>
          </svg>
        </div>
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-serif text-xl text-ink hover:text-brand-hover transition-colors">
            {name}
          </h3>
        </Link>
        <p className="text-sm text-ink-soft mt-0.5">{product.weight}</p>

        {product.reviews > 0 && (
          <div className="flex items-center gap-1 mt-1 text-sm">
            <span className="text-brand">
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))}
            </span>
            <span className="text-ink-soft text-xs">({product.reviews})</span>
          </div>
        )}

        <p className="text-ink-soft mt-2 text-sm flex-1 line-clamp-2">
          {description}
        </p>

        <div className="flex justify-between items-center gap-3 mt-4">
          <span className="text-xl font-semibold text-brand-hover">
            €{product.price.toFixed(2)}
          </span>
          <ContactToBuyButton product={product} variant="compact" />
        </div>
      </div>
    </div>
  );
}

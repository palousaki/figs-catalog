'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { withBasePath } from '@/lib/basePath';
import ContactToBuyButton from '@/components/ContactToBuyButton';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailContent({ product, related }) {
  const { lang, tx } = useLanguage();
  const t = tx.product;

  const name = product.name[lang] || product.name.en;
  const description = product.description[lang] || product.description.en;

  return (
    <div className="container mx-auto px-6 py-10 md:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2.5 text-sm text-ink-soft mb-8">
        <Link href="/" className="hover:text-ink">{t.home}</Link>
        <span className="text-line">/</span>
        <Link href="/products" className="hover:text-ink">{t.products}</Link>
        <span className="text-line">/</span>
        <span className="text-ink">{name}</span>
      </nav>

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20">
        {/* Image */}
        <div className="relative h-80 md:h-[440px] rounded-lg overflow-hidden">
          <Image
            src={withBasePath(product.image)}
            alt={name}
            fill
            className="object-cover"
            priority
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-ink/50 flex items-center justify-center">
              <span className="text-white text-2xl font-semibold">{t.outOfStock}</span>
            </div>
          )}
          <div className="absolute top-6 left-6 w-[70px] h-[70px] rounded-full bg-white/95 flex flex-col items-center justify-center gap-0.5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-fig" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" />
            </svg>
            <span className="text-[9px] tracking-wide uppercase text-fig font-semibold">{t.certified}</span>
          </div>
        </div>

        {/* Info */}
        <div>
          <span className="text-xs tracking-[0.15em] uppercase text-brand-hover font-semibold">
            {product.category}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-ink mt-3 mb-4">{name}</h1>

          {product.reviews > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-brand text-lg">
                {'★'.repeat(Math.round(product.rating))}
                {'☆'.repeat(5 - Math.round(product.rating))}
              </span>
              <span className="text-ink-soft text-sm">
                {product.rating} ({product.reviews} {t.reviews})
              </span>
            </div>
          )}

          <p className="text-ink-soft mb-6 leading-relaxed max-w-md">{description}</p>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-semibold text-ink">
              €{product.price.toFixed(2)}
            </span>
            <span className="text-ink-soft">/ {product.weight}</span>
          </div>

          <div className="mb-6">
            {product.inStock ? (
              <p className="text-olive font-medium">
                ✓ {t.inStock} &mdash;{' '}
                <span className="text-ink-soft font-normal text-sm">{t.ships}</span>
              </p>
            ) : (
              <p className="text-red-500 font-medium">✗ {t.outOfStock}</p>
            )}
          </div>

          <ContactToBuyButton product={product} />

          <div className="flex flex-wrap gap-6 mt-7 pt-6 border-t border-line">
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-olive" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3 C 6 6, 5 14, 12 21 C 19 14, 18 6, 12 3 Z" />
              </svg>
              <span className="text-sm text-ink-soft">{t.trustHandPicked}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-olive" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" />
              </svg>
              <span className="text-sm text-ink-soft">{t.trustNoAdditives}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-olive" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4.5" />
                <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
              </svg>
              <span className="text-sm text-ink-soft">{t.trustSunDried}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-ink mb-6">{t.youMightAlsoLike}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

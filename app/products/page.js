'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useLanguage } from '@/context/LanguageContext';
import { useSearchParams } from 'next/navigation';
import products from '@/data/products.json';

const CATEGORIES = ['all', 'retail', 'wholesale'];

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  );
}

function ProductsContent() {
  const { tx } = useLanguage();
  const t = tx.products;
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') || 'all';

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="container mx-auto px-6 py-12 md:py-16">
      <span className="text-xs tracking-[0.15em] uppercase text-brand-hover font-semibold">{tx.home.shopEyebrow}</span>
      <h1 className="font-serif text-4xl md:text-5xl text-ink mt-3 mb-3">{t.title}</h1>
      <p className="text-ink-soft mb-10 max-w-lg">{t.subtitle}</p>

      {/* Category tabs */}
      <div className="flex gap-9 border-b border-line mb-10 overflow-x-auto scrollbar-none">
        {CATEGORIES.map((cat) => (
          <Link
            key={cat}
            href={cat === 'all' ? '/products' : `/products?category=${cat}`}
            className={`flex-shrink-0 pb-2.5 text-sm tracking-wide uppercase border-b-2 transition ${
              activeCategory === cat
                ? 'text-ink font-semibold border-brand'
                : 'text-ink-soft border-transparent hover:text-ink'
            }`}
          >
            {t.categories[cat]}
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink-soft text-center py-20">{t.noProducts}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

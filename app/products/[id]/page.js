import { notFound } from 'next/navigation';
import ProductDetailContent from '@/components/ProductDetailContent';
import products from '@/data/products.json';

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id, 10));
  if (!product) return { title: 'Not Found - Helios Figs' };
  return { title: `${product.name.en} - Helios Figs` };
}

export default async function ProductPage({ params }) {
  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const related = products.filter((p) => p.id !== id).slice(0, 3);

  return <ProductDetailContent product={product} related={related} />;
}

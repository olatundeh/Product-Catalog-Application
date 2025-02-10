import { Suspense } from 'react';
import ProductDetails from '@/components/ProductDetails';

export default async function ProductPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductDetails productId={params.id} />
    </Suspense>
  );
}
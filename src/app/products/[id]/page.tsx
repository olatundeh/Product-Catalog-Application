import { Suspense } from 'react';
import ProductDetails from '@/components/ProductDetails';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';

export default async function ProductPage({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProductDetails productId={params.id} />
    </Suspense>
  );
}
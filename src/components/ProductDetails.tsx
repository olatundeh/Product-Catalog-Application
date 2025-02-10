'use client';
import { fetcher } from '@/lib/api';
import useSWR from 'swr';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import LoadingSpinner from '@/components/Shared/LoadingSpinner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function ProductDetails({ productId }: { productId: string }) {
  const { data: product, error } = useSWR(`${API_BASE_URL}/products/${productId}`, fetcher);

  if (error) return <div>failed to load</div>;
  if (!product) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4">
        <Card>
            <CardHeader>
                <CardTitle>{product.title}</CardTitle>
            </CardHeader>
            <img src={product.thumbnail} alt={product.title} className="w-full h-96 object-contain" />
            <CardDescription>{product.description}</CardDescription>
            <p className="font-bold">${product.price}</p>
            <p><strong>Discount:</strong> {product.discountPercentage}%</p>
            <p><strong>Rating:</strong> {product.rating}</p>
            <p><strong>Stock:</strong> {product.stock}</p>
            <p><strong>SKU:</strong> {product.sku}</p>
          </Card>
    </div>
  );
}

export default ProductDetails;
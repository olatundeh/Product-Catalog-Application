'use client';
import ProductForm from '@/components/ProductForm';
import { fetcher } from '@/lib/api';
import useSWR from 'swr';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';
import { use } from 'react';
import * as React from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function EditProductPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const { data: product, error, isLoading } = useSWR(`${API_BASE_URL}/products/${id}`, fetcher);

    if (error) return <div>failed to load</div>;
    if (!product) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
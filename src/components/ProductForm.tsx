'use client';
import { useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { createProduct, updateProduct } from '@/lib/api';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert } from './Alert';

interface ProductFormData {
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  discountPercentage: number;
  rating: number;
  stock: number;
  sku: string;
}

function ProductForm({ product }: { product?: any }) {
  const router = useRouter();
  const { mutate } = useSWR('/api/products'); // for optimistic updates
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [formData, setFormData] = useState<ProductFormData>(product ? {
    title: product.title,
    description: product.description,
    price: product.price,
    thumbnail: product.thumbnail,
    discountPercentage: product.discountPercentage || 0,
    rating: product.rating,
    stock: product.stock,
    sku: product.sku,
  } : {
    title: '',
    description: '',
    price: 0,
    thumbnail: '',
    discountPercentage: 0,
    rating: 0,
    stock: 0,
    sku: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedProduct = await updateProduct(product.id, formData); // Ensure product.id exists
      setAlert({ type: 'success', message: 'Product updated successfully!' });
      setTimeout(() => setAlert(null), 3000);
      router.push('/');
    } catch (error) {
      console.error("Error updating product:", error);
      setAlert({ type: 'error', message: 'Failed to update product.' });
      setTimeout(() => setAlert(null), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {alert && <Alert type={alert.type} message={alert.message} />}
      <div>
        <Label htmlFor="title">Title</Label>
        <Input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input type="text" id="description" name="description" value={formData.description} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="price">Price</Label>
        <Input type="number" id="price" name="price" value={formData.price} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="thumbnail">Thumbnail URL</Label>
        <Input type="text" id="thumbnail" name="thumbnail" value={formData.thumbnail} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="discountPercentage">Discount(%)</Label>
        <Input type="number" id="discountPercentage" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="rating">Rating</Label>
        <Input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="stock">Stock</Label>
        <Input type="number" id="stock" name="stock" value={formData.stock} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="sku">SKU</Label>
        <Input type="text" id="sku" name="sku" value={formData.sku} onChange={handleChange} required />
      </div>
      <Button type="submit">{product ? 'Update Product' : 'Create Product'}</Button>
    </form>
  );
}

export default ProductForm;
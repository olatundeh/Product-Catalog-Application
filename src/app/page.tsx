'use client';
import { Suspense, useState, useEffect, createContext, useContext } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/lib/api';
import Pagination from '@/components/Pagination';
import ProductCard from '@/components/ProductCard';
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import LoadingSpinner from '@/components/Shared/LoadingSpinner';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ProductContext = createContext({
  products: [],
  total: 0,
  limit: 15,
  skip: 0,
  page: 1,
  setPage: (page: number) => {},
  fetchProducts: async (page: number) => {},
  loading: true,
  error: null,
});

function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async (page: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/products?limit=${limit}&skip=${(page - 1) * limit}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setProducts(data.products);
      setTotal(data.total);
      setSkip(data.skip);
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const value = {
    products,
    total,
    limit,
    skip,
    page,
    setPage,
    fetchProducts,
    loading,
    error,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}


function ProductList() {
  const { products, total, limit, page, setPage, loading, error } = useContext(ProductContext);

  if (error) return <div>failed to load: {error}</div>;
  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/products/create">
          <Button>Create Product</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        onPageChange={setPage}
        totalPages={Math.ceil(total / limit)}
      />
    </div>
  );
}

export default function Home() {
  return (
    <ProductProvider>
      <Suspense fallback={<LoadingSpinner />}>
        <ProductList />
      </Suspense>
    </ProductProvider>
  );
}
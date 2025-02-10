import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { deleteProduct } from '@/lib/api';
import useSWR from 'swr';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    discountPercentage: number;
    rating: number;
    stock: number;
    sku: string;
}

function ProductCard({ product }: { product: Product }) {
  const { mutate } = useSWR(`${API_BASE_URL}/products`)

    const handleDelete = async () => {
        try {
            await deleteProduct(product.id)
            mutate(`${API_BASE_URL}/products`, {
            
              products: (cachedData: any) => { 
                  if (cachedData && cachedData.products) {
                    return {
                      ...cachedData,
                      products: cachedData.products.filter((p: Product) => p.id !== product.id),
                    };
                  } else if (cachedData) {
                      return cachedData.filter((p: Product) => p.id !== product.id);
                  } else {
                    return cachedData;
                  }

              }
          }, false);
        } catch (error) {
            console.error("Error deleting product:", error)
        }
    }
  return (
    <Card className="hover:shadow-lg transition duration-300">
        <CardHeader>
            <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <Link href={`/products/${product.id}`}>
        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
        </Link>
        <CardFooter className="mt-2">
            <p className={cn("line-clamp-3")}>{product.description}</p>
            <p className="font-bold">${product.price}</p>
            <div className="flex space-x-2">
                <br/>
                <Link href={`/products/${product.id}`}>
                    <Button>View</Button>
                </Link>
                <Link href={`/products/edit/${product.id}`}>
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</Button>
                </Link>
                <Button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Delete
                </Button>
            </div>
        </CardFooter>
    </Card>
  );
}

export default ProductCard;
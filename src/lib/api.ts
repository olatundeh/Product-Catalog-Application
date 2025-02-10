const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetcher = async (url: string) => {
    const res = await fetch(url);
    const json = await res.json();
    return json.products || json;
  };
  
  export const createProduct = async (productData: any) => {
    const res = await fetch(`${API_BASE_URL}/products/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    return res.json();
  };
  
  export const updateProduct = async (id: number, productData: any) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    });
    return res.json();
  };
  
  export const deleteProduct = async (id: number) => {

    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
    });
    return res.json();
  };
  
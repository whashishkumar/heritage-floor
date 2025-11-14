import ProductDetailPage from "@/components/residential/productDetail";

export interface Product {
  id: number;
  name: string;
  sku: string;
  brand: string;
  price: number;
  discount: number;
  rating: number;
  image: string;
}

export default async function Page({ params: _params }: any) {
  return (
    <div>
      <ProductDetailPage />
    </div>
  );
}

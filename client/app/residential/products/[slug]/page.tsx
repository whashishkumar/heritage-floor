import ProductDetailPage from "@/components/residential/productDetail";
import React from "react";

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

export default async function Page({ params }: any) {
  return (
    <div>
      <ProductDetailPage />
    </div>
  );
}

import GetInTouch from "@/components/commercial/GetInTouch";
import FeaturedProducts from "@/components/residential/FeaturedProducts";
import ProductDetailPage from "@/components/residential/ProductDetailPage";
import React from "react";

export default function page() {
  return (
    <>
      <ProductDetailPage />
      {/* <FeaturedProducts /> */}

      <GetInTouch />
    </>
  );
}

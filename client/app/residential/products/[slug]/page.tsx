import ProductDetailPage from "@/components/builder/productDetail";
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

export const tiles: Product[] = [
  {
    id: 1,
    name: "Ceramic Wall Tile Marble Glossy Floor Tile - 24x24",
    sku: "T001",
    brand: "Heritage Tiles",
    price: 32.5,
    discount: 10,
    rating: 4.6,
    image: "/images/residential/product/baffine.png",
  },
  {
    id: 2,
    name: "Ceramic Wall Tile - White Matt Finish 12x18",
    sku: "T002",
    brand: "TileCraft",
    price: 22.0,
    discount: 15,
    rating: 4.3,
    image: "/images/residential/product/baffine.png",
  },
  {
    id: 3,
    name: "Granite Look Porcelain Tile - 24x48",
    sku: "T003",
    brand: "StoneAge",
    price: 45.99,
    discount: 12,
    rating: 4.7,
    image: "/images/residential/product/baffine.png",
  },
  {
    id: 4,
    name: "Mosaic Bathroom Tile - Blue Shades",
    sku: "T004",
    brand: "AquaTiles",
    price: 18.75,
    discount: 5,
    rating: 4.2,
    image: "/images/residential/product/baffine.png",
  },
  {
    id: 5,
    name: "Outdoor Rough Surface Tile - 16x16",
    sku: "T005",
    brand: "Durastone",
    price: 27.5,
    discount: 8,
    rating: 4.5,
    image: "/images/tiles/tile05.png",
  },
  {
    id: 6,
    name: "Wood Finish Tile - Oak Texture 8x48",
    sku: "T006",
    brand: "Heritage Tiles",
    price: 36.99,
    discount: 10,
    rating: 4.8,
    image: "/images/tiles/tile06.png",
  },
  {
    id: 7,
    name: "Glossy Subway Tile - 3x12 White",
    sku: "T007",
    brand: "UrbanCeram",
    price: 15.5,
    discount: 7,
    rating: 4.1,
    image: "/images/tiles/tile07.png",
  },
  {
    id: 8,
    name: "Textured Kitchen Tile - 12x24 Grey",
    sku: "T008",
    brand: "Kitchora",
    price: 29.95,
    discount: 9,
    rating: 4.4,
    image: "/images/residential/product/baffine.png",
  },
];

const tileSortOptions = [
  { label: "All Categories", value: "all" },
  { label: "Floor Tiles", value: "floor_tiles" },
  { label: "Wall Tiles", value: "wall_tiles" },
  { label: "Bathroom Tiles", value: "bathroom_tiles" },
  { label: "Kitchen Tiles", value: "kitchen_tiles" },
  { label: "Outdoor Tiles", value: "outdoor_tiles" },
];

export default function page() {
  return (
    <div>
      <ProductDetailPage
        productsData={tiles}
        sortOptionsCategory={tileSortOptions}
      />
    </div>
  );
}

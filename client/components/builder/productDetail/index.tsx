"use client";
import ProductCard from "@/components/common/Product";
import React, { useState, useEffect, use } from "react";
import SideBar from "./SideBar";
import Selector from "@/components/ui/Selector";
import Pagination from "@/components/ui/Pagnation";
import { LuFilter } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";

export interface Product {
  id: number;
  name: string;
  sku: string;
  brand: string;
  price: number;
  discount?: number;
  rating: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: "236",
    brand: "Crain",
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: "/images/builder/pcrain.png",
  },
  {
    id: 11,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: "236",
    brand: "Crain",
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: "/images/builder/p01.png",
  },
  {
    id: 12,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: "236",
    brand: "Crain",
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: "/images/builder/p02.png",
  },
  {
    id: 131,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: "236",
    brand: "Crain",
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: "/images/builder/p03.png",
  },
  {
    id: 10,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: "236",
    brand: "Crain",
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: "/images/builder/pcrain.png",
  },
  {
    id: 101,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: "236",
    brand: "Crain",
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: "/images/builder/p01.png",
  },
  {
    id: 10120,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: "236",
    brand: "Crain",
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: "/images/builder/p02.png",
  },
  {
    id: 10201,
    name: 'Crain Disposable Cove Base Nozzle - 3"',
    sku: "236",
    brand: "Crain",
    price: 4.95,
    discount: 20,
    rating: 4.4,
    image: "/images/builder/p03.png",
  },
];

const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "low_to_high" },
  { label: "Price: High to Low", value: "high_to_low" },
  { label: "Newest First", value: "newest" },
];

const accOptions = [
  { label: "Acc", value: "acc" },
  { label: "Dec", value: "dec" },
];

export default function ProductDetailPage({
  productsData,
  sortOptionsCategory,
}: any) {
  const router = useRouter();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const dataList = productsData ? productsData : products;
  const shortOptions = sortOptionsCategory ? sortOptionsCategory : sortOptions;
  const params = useParams();
  const { slug } = params;
  const [priceSort, setPriceSort] = useState<any>(null);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileFilterOpen]);

  const handlePriceBaseFilter = (value: string | number) => {
    setPriceSort(value);
    console.log("Price Sort Selected:", value);
  };

  const handleOrderChange = (value: string | number) => {
    setOrder(value);
    console.log("Order Selected:", value);
  };

  const handleToggleMobileFilter = () => {
    setIsMobileFilterOpen((prev) => !prev);
  };

  const handleGetProductDetail = (id: string) => {
    router.push(`/builder/products/${id}`);
  };

  return (
    <>
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={handleToggleMobileFilter}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-[3.063rem] left-0 h-full w-[80%] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden overflow-x-scroll ${
          isMobileFilterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end items-center ">
          <button
            onClick={handleToggleMobileFilter}
            className="text-black text-xl p-3 "
          >
            <MdClose size={24} />
          </button>
        </div>
        <div className="px-4 overflow-y-auto    h-[calc(100%+4rem)] ">
          <SideBar />
        </div>
      </div>

      <div className="wrapper m-auto flex py-6 md:py-12 gap-10 flex-col md:flex-row poppins-font ">
        <div className="w-full hidden md:block md:w-[30%] lg:w-[20%] md:sticky md:top-24 self-start h-fit ">
          <SideBar />
        </div>

        <div className="w-full ">
          {/* desktop */}
          <div className=" hidden md:flex justify-between items-center bg-[#fff] sticky top-12 z-30 py-4">
            <p className="font-semibold text-lg poppins-font">
              Products Founds : 345
            </p>
            <div className="grid grid-cols-2 gap-6">
              <Selector
                label="Sort By"
                options={shortOptions}
                placeholder={shortOptions?.[0].label}
                value={priceSort}
                onChange={handlePriceBaseFilter}
              />
              <div>
                <Selector
                  label="Order"
                  options={accOptions}
                  placeholder="Order"
                  value={order}
                  onChange={handleOrderChange}
                />
              </div>
            </div>
          </div>

          {/* mobile */}
          <div className="md:hidden flex items-center justify-between ">
            <p className="font-semibold text-lg poppins-font">
              Products Founds : 345
            </p>
            <div className=" cursor-pointer" onClick={handleToggleMobileFilter}>
              <LuFilter size={24} />
            </div>
          </div>

          {/* Product Grid */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mt-4">
              {dataList?.map((product: any) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleGetProductDetail={handleGetProductDetail}
                />
              ))}
            </div>
            <Pagination
              currentPage={1}
              totalPages={3}
              onPageChange={function (page: number): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

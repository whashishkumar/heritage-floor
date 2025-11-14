"use client";
import ProductCard from "@/components/commercial/Product";
import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Selector from "@/components/ui/Selector";
import Pagination from "@/components/ui/Pagnation";
import { LuFilter } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { ResidentailPageData } from "@/lib/api/endpoints";
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
  { label: "Acc", value: "asc" },
  { label: "Dec", value: "dsc" },
];

export default function ProductDetailPage({ sortOptionsCategory }: any) {
  const router = useRouter();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState<Product[] | null>(
    null
  );
  const [currentPage, setCurrentpage] = useState(1);
  const [productCategory, setProductCategory] = useState(null);
  const shortOptions = sortOptionsCategory ? sortOptionsCategory : sortOptions;
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileFilterOpen]);

  const handleSortChange = async (value: string | number) => {
    const { data } = await ResidentailPageData.getCategoryBasedProducts({
      categoryid: slug ? Number(slug) : undefined,
      order: value,
    });
    setProductCategory(data);
  };

  const handleToggleMobileFilter = () => {
    setIsMobileFilterOpen((prev) => !prev);
  };

  const getCatogeryBaseProducts = async () => {
    const { data } = await ResidentailPageData.getCategoryBasedProducts({
      categoryid: slug ? Number(slug) : undefined,
      page: currentPage,
      limit: 12,
    });
    setCategoryProducts(data);
  };

  const getCategoryList = async () => {
    const { data } = await ResidentailPageData.getCategories();
    setProductCategory(data);
  };

  const handleGetProductDetail = (id: string) => {
    router.push(`/residential/products/${slug}/${id}`);
  };

  const handlePageChage = (page: any) => {
    setCurrentpage(page);
  };

  useEffect(() => {
    getCatogeryBaseProducts();
    getCategoryList();
  }, []);

  console.log(currentPage, "setCurrentpage");

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
                onChange={handleSortChange}
              />
              <div>
                <Selector
                  label="Sort By"
                  options={accOptions}
                  placeholder="Order"
                  onChange={handleSortChange}
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
              {categoryProducts?.map((product: any) => (
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
              onPageChange={handlePageChage}
            />
          </div>
        </div>
      </div>
    </>
  );
}

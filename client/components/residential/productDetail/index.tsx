"use client";
import ProductCard from "@/components/common/Product";
import React, { useState, useEffect, Suspense } from "react";
import SideBar from "./SideBar";
import Selector from "@/components/ui/Selector";
import Pagination from "@/components/ui/Pagnation";
import { LuFilter } from "react-icons/lu";
import { MdClose } from "react-icons/md";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/ui/Loader";
import { ResidentailPageData } from "@/lib/api/residentialEndPoints";

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

const sortOptions = [
  { label: "Low to High", value: "price-asc" },
  { label: "High to Low", value: "price-desc" },
];

const accOptions = [
  { label: "Acc", value: "asc" },
  { label: "Dec", value: "desc" },
];

export default function ProductDetailPage({ sortOptionsCategory }: any) {
  const router = useRouter();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState<any | null>(null);
  const [currentPage, setCurrentpage] = useState(1);
  const [productCategory, setProductCategory] = useState<any[]>([]);
  const shortOptions = sortOptionsCategory ? sortOptionsCategory : sortOptions;
  const params = useParams();
  const { slug } = params;
  const [order, setOrder] = useState<any>(null);
  const [priceSort, setPriceSort] = useState<any>(null);
  const [brandSort, setBrandSort] = useState<any>(null);
  const [colorSort, setColorSort] = useState<any>(null);
  const [sizeSort, setSizeSort] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  useEffect(() => {
    if (isMobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileFilterOpen]);

  const handleSortChange = async (value: string | number) => {
    setOrder(value);
    const res = await ResidentailPageData.getCategoryBasedProducts({
      categoryid: slug ? Number(slug) : undefined,
      order: value,
      brand: brandSort,
      color: colorSort,
      size: sizeSort,
      page: currentPage,
      limit: 12,
    });

    setCategoryProducts(res);
  };

  const handlePriceBaseFilter = async (value: any) => {
    setPriceSort(value);
    const res = await ResidentailPageData.getCategoryBasedProducts({
      categoryid: slug ? Number(slug) : undefined,
      order: order,
      sortId: value,
      brand: brandSort,
      color: colorSort,
      size: sizeSort,
      page: currentPage,
      limit: 12,
    });
    setCategoryProducts(res);
  };

  const handleToggleMobileFilter = () => {
    setIsMobileFilterOpen((prev) => !prev);
  };

  const getCatogeryBaseProducts = async () => {
    const resp = await ResidentailPageData.getCategoryBasedProducts({
      categoryid: slug ? Number(slug) : undefined,
      page: currentPage,
      limit: 12,
    });
    setCategoryProducts(resp);
  };

  const getCategoryList = async () => {
    const { data } = await ResidentailPageData.getCategories();
    setProductCategory(data);
  };

  const handleGetProductDetail = (id: string) => {
    router.push(`/residential/products/${slug}/${id}`);
  };

  const handlePageChage = async (page: any) => {
    setCurrentpage(page);
    const resp = await ResidentailPageData.getCategoryBasedProducts({
      categoryid: slug ? Number(slug) : undefined,
      page: page,
      limit: 12,
    });
    setCategoryProducts(resp);
  };

  const handleSelectionChange = async (filterBy: any) => {
    const { Brand, Color, Size } = filterBy;
    setBrandSort(Brand);
    setColorSort(Color);
    setSizeSort(Size);
    const res = await ResidentailPageData.getCategoryBasedProducts({
      categoryid: slug ? Number(slug) : undefined,
      order: order,
      sortId: priceSort,
      page: currentPage,
      brand: Brand,
      color: Color,
      size: Size,
      limit: 12,
    });
    setCategoryProducts(res);
  };

  const handleAllClearFilter = async () => {
    setPriceSort(null);
    setBrandSort(null);
    setColorSort(null);
    setSizeSort(null);
    const res = await ResidentailPageData.getCategoryBasedProducts({
      categoryid: slug ? Number(slug) : undefined,
      order: order,
      sortId: priceSort,
      page: currentPage,
      limit: 12,
    });
    setCategoryProducts(res);
  };

  const handleCategory = async (id:any) => {
    setSelectedCategory(id);
    const resp = await ResidentailPageData.getCategoryBasedProducts({
      categoryid: id ? Number(id) : undefined,
      page: currentPage,
      limit: 12,
    });
    setCategoryProducts(resp);
  }

  useEffect(() => {
    getCatogeryBaseProducts();
    getCategoryList();
  }, []);

  
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
          <SideBar
            handleSortChange={handleSortChange}
            handlePriceBaseFilter={handlePriceBaseFilter}
          />
        </div>
      </div>

      <div className="wrapper m-auto flex py-6 md:py-12 gap-10 flex-col md:flex-row poppins-font ">
        <div className="w-full hidden md:block md:w-[30%] lg:w-[20%] md:sticky md:top-24 self-start h-fit ">
          <SideBar
            handleSortChange={handleSortChange}
            handlePriceBaseFilter={handlePriceBaseFilter}
            handleSelectionChange={handleSelectionChange}
            handleAllClearFilter={handleAllClearFilter}
          />
        </div>

        <div className="w-full ">
          {/* desktop */}
          <div className=" hidden md:flex justify-between items-center bg-[#fff] sticky top-12 z-30 py-4">
            <p className="font-semibold text-lg poppins-font">
              Products Founds : {categoryProducts?.meta?.total}
            </p>
            <div className="grid grid-cols-3 gap-4">
                 <div>
                <Selector
                  label="Category"
                  options={productCategory}
                  placeholder="Category"
                  value={selectedCategory}
                  onChange={handleCategory}
                />
              </div>
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
                  placeholder="Acc"
                  value={order}
                  onChange={handleSortChange}
                />
              </div>
            </div>
          </div>

          {/* mobile */}
          <div className="md:hidden flex items-center justify-between ">
            <p className="font-semibold text-lg poppins-font">
              Products Founds : {categoryProducts?.meta?.total}
            </p>
            <div className=" cursor-pointer" onClick={handleToggleMobileFilter}>
              <LuFilter size={24} />
            </div>
          </div>

          {/* Product Grid */}
          <Suspense fallback={<Loader />}>
            <div>
              <div className="mt-4">
                {categoryProducts?.data?.length === 0 ? (
                  <p className="text-center text-gray-500 text-lg py-10 capitalize">
                    No products found
                  </p>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                      {categoryProducts?.data?.map(
                        (product: any, idx: number) => (
                          <ProductCard
                            key={idx}
                            product={product}
                            handleGetProductDetail={handleGetProductDetail}
                          />
                        )
                      )}
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={categoryProducts?.meta?.last_page}
                      onPageChange={handlePageChage}
                    />
                  </>
                )}
              </div>
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
}

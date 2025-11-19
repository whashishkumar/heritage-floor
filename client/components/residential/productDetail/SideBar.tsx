"use client";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import CheckboxSingleSelector from "@/components/ui/CheckboxSingleSelector";
import PriceRangeSelector from "@/components/ui/PriceRangeSelector";
import Selector from "@/components/ui/Selector";
import { ResidentailPageData } from "@/lib/api/residentialEndPoints";
import React, { useEffect, useState } from "react";

interface Option {
  id: number | string;
  label: string;
  value: string;
}
interface FilterGroup {
  title: string;
  code: string;
  options: Option[];
}

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

interface SideBarProps {
  handleSortChange?: (value: string | number) => void;
  handleSelectionChange?: (filters: Record<string, string[]>) => void;
  handlePriceBaseFilter?: (value: any) => void;
  handleAllClearFilter?:(value: any) => void;
}

export default function SideBar({handleSortChange,handleSelectionChange,handlePriceBaseFilter,handleAllClearFilter}: SideBarProps) {
  const [filterList, setFilterList] = useState<FilterGroup[]>([])
  const [mobilePriceSort, setMobilePriceSort] = useState<any>(null);
  const [mobileOrder, setMobileOrder] = useState<any>(null);
  
  const getFiltersList = async () => {
    const {data} = await ResidentailPageData.getProductFiltersList()
    setFilterList(data)
  }

  const handleMobilePriceChange = (value: any) => {
    setMobilePriceSort(value);
    handlePriceBaseFilter?.(value);
  };

  const handleMobileOrderChange = (value: string | number) => {
    setMobileOrder(value);
    handleSortChange?.(value);
  };

  const handleClearAllFilters = () => {
    setMobilePriceSort(null);
    setMobileOrder(null);
    handleAllClearFilter?.(null);
  };

useEffect(()=>{
  getFiltersList()
},[])

  return (
    <div>
      <div className="w-full grid grid-cols-2 font-bold py-2 text-[#5A5A5A] capitalize font-xl ">
        <p>Filters:</p>
        <button className="text-right cursor-pointer capitalize" onClick={handleClearAllFilters}>Clear All</button>
      </div>
      <div className="block md:hidden mb-[1rem]">
        <Selector
          label="Sort By"
          options={sortOptions}
          placeholder="Price"
          value={mobilePriceSort}
          onChange={handleMobilePriceChange}
        />
      </div>
      <div className="block md:hidden mb-[1rem]">
        <Selector
          label="Order"
          options={accOptions}
          placeholder="Order"
          value={mobileOrder}
          onChange={handleMobileOrderChange}
        />
      </div>
      {/* <PriceRangeSelector
        min={100}
        max={50000}
        step={500}
        onChange={handlePriceChange}
      />
      <CheckboxSingleSelector
        onChange={handleSingleSelectionChange}
        data={filterDataSilgleSelect}
      /> */}
      {
        filterList && 
          <CheckboxGroup onChange={handleSelectionChange} data={filterList} />
      }
    </div>
  );
}

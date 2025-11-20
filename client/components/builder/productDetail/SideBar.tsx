'use client';
import CheckboxGroup from '@/components/ui/CheckboxGroup';
import CheckboxSingleSelector from '@/components/ui/CheckboxSingleSelector';
import PriceRangeSelector from '@/components/ui/PriceRangeSelector';
import Selector from '@/components/ui/Selector';
import React from 'react';

const filterData = [
  {
    title: 'Brand',
    code: 'brand',
    options: [
      { id: 1, label: 'Heritage', value: 'heritage' },
      { id: 2, label: 'Elite Floors', value: 'elite' },
      { id: 3, label: 'WoodWorks', value: 'woodworks' },
      { id: 4, label: 'FloorCraft', value: 'floorcraft' },
    ],
  },
  {
    title: 'Collection',
    code: 'collection',
    options: [
      { id: 5, label: 'Classic', value: 'classic' },
      { id: 6, label: 'Modern', value: 'modern' },
      { id: 7, label: 'Luxury', value: 'luxury' },
      { id: 8, label: 'Rustic', value: 'rustic' },
    ],
  },
  {
    title: 'Color',
    code: 'color',
    options: [
      { id: 9, label: 'Oak Brown', value: 'oak-brown' },
      { id: 10, label: 'Grey Ash', value: 'grey-ash' },
      { id: 11, label: 'Natural Maple', value: 'natural-maple' },
      { id: 12, label: 'Walnut', value: 'walnut' },
    ],
  },
  {
    title: 'Material',
    code: 'material',
    options: [
      { id: 13, label: 'Engineered Wood', value: 'engineered-wood' },
      { id: 14, label: 'Solid Wood', value: 'solid-wood' },
      { id: 15, label: 'Laminate', value: 'laminate' },
      { id: 16, label: 'Vinyl', value: 'vinyl' },
      { id: 17, label: 'SPC (Stone Plastic Composite)', value: 'spc' },
    ],
  },
  {
    title: 'Looks',
    code: 'looks',
    options: [
      { id: 18, label: 'Matte Finish', value: 'matte' },
      { id: 19, label: 'Glossy Finish', value: 'glossy' },
      { id: 20, label: 'Textured', value: 'textured' },
      { id: 21, label: 'Rustic Finish', value: 'rustic-finish' },
    ],
  },
  {
    title: 'Ply Rating',
    code: 'ply_rating',
    options: [
      { id: 22, label: '3-Ply', value: '3-ply' },
      { id: 23, label: '5-Ply', value: '5-ply' },
      { id: 24, label: '7-Ply', value: '7-ply' },
      { id: 25, label: '9-Ply', value: '9-ply' },
    ],
  },
  {
    title: 'Collection Name',
    code: 'collection_name',
    options: [
      { id: 26, label: 'Vintage Charm', value: 'vintage-charm' },
      { id: 27, label: 'Urban Edge', value: 'urban-edge' },
      { id: 28, label: 'Coastal Breeze', value: 'coastal-breeze' },
      { id: 29, label: 'Nature Essence', value: 'nature-essence' },
    ],
  },
  {
    title: 'Edge Type',
    code: 'edge_type',
    options: [
      { id: 30, label: 'Square Edge', value: 'square-edge' },
      { id: 31, label: 'Beveled Edge', value: 'beveled-edge' },
      { id: 32, label: 'Micro Bevel', value: 'micro-bevel' },
      { id: 33, label: 'Rolled Edge', value: 'rolled-edge' },
    ],
  },
  {
    title: 'Availability',
    code: 'availability',
    options: [
      { id: 34, label: 'In Stock', value: 'in-stock' },
      { id: 35, label: 'Out of Stock', value: 'out-of-stock' },
      { id: 36, label: 'Pre-Order', value: 'pre-order' },
    ],
  },
];

const sortOptions = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Price: Low to High', value: 'low_to_high' },
  { label: 'Price: High to Low', value: 'high_to_low' },
  { label: 'Newest First', value: 'newest' },
];

const filterDataSilgleSelect = [
  {
    title: 'Product Types',
    options: [
      { id: 1, label: 'Ceramic Tiles', value: 'ceramic' },
      { id: 2, label: 'Porcelain Tiles', value: 'porcelain' },
      { id: 3, label: 'Vitrified Tiles', value: 'vitrified' },
      { id: 4, label: 'Mosaic Tiles', value: 'mosaic' },
      { id: 5, label: 'Stone Tiles', value: 'stone' },
      { id: 6, label: 'Cement Tiles', value: 'cement' },
    ],
  },
];

const accOptions = [
  { label: 'Acc', value: 'acc' },
  { label: 'Dec', value: 'dec' },
];

export default function SideBar() {
  const [mobilePriceSort, setMobilePriceSort] = React.useState<any>(null);
  const [mobileOrder, setMobileOrder] = React.useState<any>(null);

  const handlePriceChange = (range: { min: number; max: number }) => {
    console.log('Selected Price Range:', range);
  };

  const handleSelectionChange = (filters: Record<string, string[]>) => {
    console.log('Selected values:', filters);
  };

  const handleSingleSelectionChange = (filters: Record<string, string | null>) => {
    console.log('Single selected values:', filters);
  };

  const handleMobilePriceChange = (value: string | number) => {
    setMobilePriceSort(value);
    console.log('Selected:', value);
  };

  const handleMobileOrderChange = (value: string | number) => {
    setMobileOrder(value);
    console.log('Selected:', value);
  };

  const handleClearAllFilters = () => {
    setMobilePriceSort(null);
    setMobileOrder(null);
  };

  return (
    <div>
      <div className="w-full grid grid-cols-2 font-bold py-2 text-[#5A5A5A] capitalize font-xl ">
        <p>Filters:</p>
        <p className="text-right cursor-pointer" onClick={handleClearAllFilters}>
          Clear All
        </p>
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
      <PriceRangeSelector min={100} max={50000} step={500} onChange={handlePriceChange} />
      <CheckboxSingleSelector
        onChange={handleSingleSelectionChange}
        data={filterDataSilgleSelect}
      />
      <CheckboxGroup onChange={handleSelectionChange} data={filterData} />
    </div>
  );
}

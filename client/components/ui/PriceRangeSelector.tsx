'use client';
import React, { useState, useRef, useEffect } from 'react';

interface PriceRangeSelectorProps {
  min?: number;
  max?: number;
  step?: number;
  onChange?: (range: { min: number; max: number }) => void;
}

const PriceRangeSelector: React.FC<PriceRangeSelectorProps> = ({
  min = 0,
  max = 50000,
  step = 100,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const trackRef = useRef<HTMLDivElement>(null);

  // Calculate percentages for thumb positions
  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  // Handle dragging logic
  const handleDrag = (isMin: boolean) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const rect = track.getBoundingClientRect();

    const onMove = (moveEvent: MouseEvent) => {
      const x = moveEvent.clientX - rect.left;
      const percent = Math.min(Math.max(x / rect.width, 0), 1);
      const value = Math.round((min + percent * (max - min)) / step) * step;
      if (isMin) {
        setMinValue((prev) => Math.min(value, maxValue - step));
      } else {
        setMaxValue((prev) => Math.max(value, minValue + step));
      }
    };

    const onUp = () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  };

  // Send updates to parent
  useEffect(() => {
    onChange?.({ min: minValue, max: maxValue });
  }, [minValue, maxValue]);

  return (
    <div className="w-full flex flex-col gap-4 poppins-font text-[#444]">
      <h3 className="font-semibold text-lg">Price Range</h3>

      {/* Labels */}
      <div className="flex justify-between text-sm font-medium">
        <span>${minValue.toLocaleString()}</span>
        <span>${maxValue.toLocaleString()}</span>
      </div>

      {/* Slider track */}
      <div ref={trackRef} className="relative h-2 bg-gray-200 rounded-full cursor-pointer">
        {/* Active Range */}
        <div
          className="absolute h-2 bg-[#018C99] rounded-full transition-all duration-150"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        ></div>

        {/* Min Thumb */}
        <div
          onMouseDown={handleDrag(true)}
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-[#018C99] rounded-full shadow-md cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
          style={{ left: `calc(${minPercent}% - 10px)` }}
        ></div>

        {/* Max Thumb */}
        <div
          onMouseDown={handleDrag(false)}
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white border-2 border-[#018C99] rounded-full shadow-md cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
          style={{ left: `calc(${maxPercent}% - 10px)` }}
        ></div>
      </div>

      {/* Selected range info */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>Min: ${minValue.toLocaleString()}</span>
        <span>Max: ${maxValue.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default PriceRangeSelector;

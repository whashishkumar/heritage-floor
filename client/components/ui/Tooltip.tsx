"use client";

import { ReactNode, useState } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({
  text,
  children,
  position = "top",
}: TooltipProps) {
  const [visible, setVisible] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  }[position];

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className={`absolute z-50 whitespace-nowrap px-2 py-1 text-xs text-white bg-gray-900 rounded-md shadow-md transition-opacity duration-200 ${positionClasses}`}
        >
          {text}
          <div
            className={`absolute w-2 h-2 bg-gray-900 rotate-45 ${
              position === "top"
                ? "top-full left-1/2 -translate-x-1/2"
                : position === "bottom"
                ? "bottom-full left-1/2 -translate-x-1/2"
                : position === "left"
                ? "left-full top-1/2 -translate-y-1/2"
                : "right-full top-1/2 -translate-y-1/2"
            }`}
          />
        </div>
      )}
    </div>
  );
}

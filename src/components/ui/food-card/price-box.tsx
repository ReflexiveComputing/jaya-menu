import React from "react";

interface PriceBoxProps {
  price: number;
  className?: string;
}

export function PriceBox({ price, className = "" }: PriceBoxProps) {
  const priceNumber = typeof price === "number" ? price : parseFloat(String(price)) || 0;
  const priceStr = priceNumber.toFixed(2);
  const [priceMain, priceDec] = priceStr.split(".");

  return (
    <div className={`absolute top-0 left-0 p-2 transition-colors bg-gray-900/85 ${className}`}>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-amber-400 leading-none">€{priceMain}</span>
        <span className="text-sm ml-1 text-gray-200 leading-none">.{priceDec}</span>
      </div>
    </div>
  );
}
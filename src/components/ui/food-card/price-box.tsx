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
    <div className={`absolute top-0 left-0 py-2 w-11 h-8 transition-colors bg-app-dark-highlight ${className}`}>
      <div className="flex items-baseline m-auto">
        <span className="font-semibold text-sm text-app-light-highlight leading-none">€</span>
        <span className="font-semibold text-sm leading-none text-gray-200">{priceMain}</span>
        <span className="text-xs ml-1 text-gray-200 leading-none">.{priceDec}</span>
      </div>
    </div>
  );
}
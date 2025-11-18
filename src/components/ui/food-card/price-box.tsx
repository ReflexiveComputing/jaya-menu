"use client";


import React from "react";

interface PriceBoxProps {
  price: number;
  className?: string;
  color?: string;
}

export function PriceBox({ price, className = "", color }: PriceBoxProps) {
  const priceNumber = typeof price === "number" ? price : parseFloat(String(price)) || 0;
  const priceStr = priceNumber.toFixed(2);
  const [priceMain, priceDec] = priceStr.split(".");

  return (
    <div className={`absolute top-0 left-0 p-1 min-w-11 min-h-8 transition-colors bg-app-dark-highlight ${className}`}>
      <div className="flex items-baseline m-auto">
        <span  style={{ color: color }} className="font-medium text-sm text-app-light-highlight">€</span>
        <span className="font-medium ml-0.5 text-sm leading-none text-gray-200">{priceMain}</span>
        <span className="text-xs text-gray-200 leading-none">.{priceDec}</span>
      </div>
    </div>
  );
}
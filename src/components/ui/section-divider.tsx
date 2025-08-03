import React from "react";
import Link from "next/link";

interface SectionDividerProps {
  href: string;
  title: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ href, title }) => (
  <div className="px-4 mb-4 flex items-center justify-between w-fit">
    <Link href={href} className="w-full">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="w-full h-1 bg-black mt-1"></div>
    </Link>
  </div>
);

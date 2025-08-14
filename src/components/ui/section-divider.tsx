import React from "react";
import Link from "next/link";

interface SectionDividerProps {
  href?: string;
  title: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ href, title }) => {
  const content = (
    <>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="w-full h-1 bg-black mt-1"></div>
    </>
  );

  if (href) {
    return (
      <div className="px-4 mb-4 flex items-center justify-between w-fit">
        <Link href={href} className="w-full">
          {content}
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 mb-4 flex items-center justify-between w-fit">
      <div className="w-full">
        {content}
      </div>
    </div>
  );
};

import React from "react";
import Link from "next/link";
import NepaliSunIcon from "./icons/svg/nepali-sun";
import { DashedLines } from "./dashed-lines";

interface SectionDividerProps {
  href?: string;
  title: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({ href, title }) => {
  const content = (
    <>
      <h2 className="m-auto uppercase text-lg text-app-light-highlight font-bold font-fjala">{title}</h2>
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
    <div className="px-4 mb-4 flex items-center justify-between w-full">
      <div className="m-auto w-full flex flex-row">
        <div className="m-auto px-2 ">
          <NepaliSunIcon backgroundColor="#febd3a"/>
        </div>
        {content}
        <DashedLines className="ml-2" color="#febd3a" dashWidth={4} gap={3} height={1} />
      </div>
    </div>
  );
};

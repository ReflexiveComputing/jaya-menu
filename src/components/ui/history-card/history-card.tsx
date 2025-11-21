import React from "react";
import TempleTopIcon from "../icons/svg/temple-top";
import TempleBottomIcon from "../icons/svg/temple-bottom";

type HistoryCardProps = {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  heightClass?: string;
};

export default function HistoryCard({ children, className = "", color = "#febd3a", heightClass = "h-64" }: HistoryCardProps) {
  // color used to fill the decorative svg shapes. If your Tailwind `bg-app-light-highlight` differs,
  // replace the hex with the design token color. This produces the same visual fill as the card.
  const fill = "#272323";

  return (
    <div className={`relative min-w-40 ${heightClass} bg-app-background  overflow-hidden ${className}`}>
      {/* top decorative shape - positioned to overlap the top edge */}
      <div className="absolute -left-2 -top-[54px] z-10 pointer-events-none">
        <TempleTopIcon fillColor={fill} size={175} aria-hidden />
      </div>

      {/* content area (centered) */}
      <div style={{ backgroundColor: color }} className="relative flex flex-col h-64 w-full items-center justify-center px-2 ">
        {children}
      </div>

      {/* bottom decorative shape - positioned to overlap the bottom edge */}
      <div className="absolute -left-2 -bottom-[64px] z-10 pointer-events-none">
        <TempleBottomIcon fillColor={fill} size={175} aria-hidden />
      </div>
    </div>
  );
}

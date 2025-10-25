import React from "react";

type VerticalDashedLinesProps = {
  className?: string;
  color?: string;
  dashHeight?: number; // px height of each dash segment
  gap?: number;        // px gap between dashes
  width?: number;      // px thickness of the vertical line
  marginTop?: number | string | undefined;
  marginLeft?: number | string | undefined;
  grow?: boolean;      // allow flex-grow in a column flex container
};

export const VerticalDashedLines: React.FC<VerticalDashedLinesProps> = ({
  className = "",
  color = "#ffffff",
  dashHeight = 8,
  gap = 8,
  width = 2,
  marginTop,
  marginLeft,
  grow = true,
}) => {
  const bg = `repeating-linear-gradient(
    to bottom,
    ${color} 0 ${dashHeight}px,
    transparent ${dashHeight}px ${dashHeight + gap}px
  )`;

  const style: React.CSSProperties = {
    display: "block",
    width: typeof width === "number" ? `${width}px` : width,
    // allow flex containers to give it remaining space when desired
    flexGrow: grow ? 1 : 0,
    flexShrink: 1,
    alignSelf: "stretch",
    backgroundImage: bg,
    backgroundRepeat: "repeat-y",
    backgroundPosition: "center",
    ...(marginTop !== undefined ? { marginTop } : {}),
    ...(marginLeft !== undefined ? { marginLeft } : {}),
  };

  return (
    <span
      className={className}
      aria-hidden="true"
      role="presentation"
      style={style}
    />
  );
};

export default VerticalDashedLines;
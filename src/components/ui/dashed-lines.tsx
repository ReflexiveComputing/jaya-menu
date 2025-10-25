import React from "react";

type DashedLinesProps = {
  className?: string;
  color?: string;
  dashWidth?: number; // px
  gap?: number;       // px
  height?: number;    // px
  marginLeft?: number | string | undefined;
};

export const DashedLines: React.FC<DashedLinesProps> = ({
  className = "",
  color = "#ffffff",
  dashWidth = 8,
  gap = 8,
  height = 2,
  marginLeft,
}) => {
  const bg = `repeating-linear-gradient(
    to right,
    ${color} 0 ${dashWidth}px,
    transparent ${dashWidth}px ${dashWidth + gap}px
  )`;

  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        display: "block",
        flexGrow: 1,           // allow it to take remaining horizontal space in a flex row
        height,
        alignSelf: "center",
        backgroundImage: bg,
        backgroundRepeat: "repeat-x",
        ...(marginLeft !== undefined ? { marginLeft } : {}), // only set inline margin if provided
      }}
    />
  );
};

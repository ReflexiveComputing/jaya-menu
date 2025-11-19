import React from "react";

interface TempleBottomIconProps extends React.SVGProps<SVGSVGElement> {
  strokeColor?: string;
  fillColor?: string;
  size?: number;
}

const TempleBottomIcon: React.FC<TempleBottomIconProps> = ({
  strokeColor = "#231f20",
  fillColor,
  size,
  className,
  role = "img",
  ...props
}) => {
  const useFill = typeof fillColor !== "undefined";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 325.81 131.63"
      width={size}
      height={size}
      className={className}
      role={role}
      aria-hidden={role === "img" ? undefined : true}
      {...props}
    >
      <g id="Layer_3">
        <path
          d="M.5,8.9c.72,4.01,6.16,31.53,32.64,46.94,23.59,13.73,47.04,8.04,51.59,6.83,1.41,6.79,7.33,31.25,30.49,49.62,21.21,16.82,43.88,18.24,51.21,18.39,7.49-.74,34.37-4.3,55.86-26.97,15.25-16.08,20.25-33.83,22.02-42.09,4.27,1.01,29.26,6.46,52.05-9.05,2.26-1.54,17.22-12.01,24.16-31.16,4.18-11.52,3.55-20.92,3.94-20.91.66,0,1.14,26.68.64,130.22-108.15.13-216.3.27-324.45.4-.05-40.74-.1-81.48-.15-122.22Z"
          fill={useFill ? fillColor : "none"}
          stroke={useFill ? "none" : strokeColor}
          strokeMiterlimit={10}
          vectorEffect={useFill ? "non-scaling-stroke" : undefined}
        />
      </g>
    </svg>
  );
};

export default TempleBottomIcon;

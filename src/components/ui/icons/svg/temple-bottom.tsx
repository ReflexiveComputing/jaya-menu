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
          d="M314.55.52c3.48,0,6.97,0,10.45,0v110.99H.5V.52c4.24.16,8.48.32,12.71.47,5.76,31.19,46.82,53.87,76,42.67,14.01,81.69,133.12,82.74,148.44,1.33,24.58,6.34,67.2-11.14,76.89-44.47Z"
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

import React from "react";

interface TempleTopIconProps extends React.SVGProps<SVGSVGElement> {
  strokeColor?: string;
  fillColor?: string;
  size?: number;
}

const TempleTopIcon: React.FC<TempleTopIconProps> = ({
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
      viewBox="0 0 325.76 131.22"
      width={size}
      height={size}
      className={className}
      role={role}
      aria-hidden={role === "img" ? undefined : true}
      {...props}
    >
      <g id="Layer_3">
        <path
         d="M10.95,111.49c-3.48,0-6.97,0-10.45,0V.5h324.5v110.99c-4.24-.16-8.48-.32-12.71-.47-5.76-31.19-46.82-53.87-76-42.67-14.01-81.69-133.12-82.74-148.44-1.33-24.58-6.34-67.2,11.14-76.89,44.47Z"
          fill={useFill ? fillColor : "none"}
          stroke={useFill ? "none" : strokeColor}
          strokeMiterlimit={10}
        />
      </g>
    </svg>
  );
};

export default TempleTopIcon;
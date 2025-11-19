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
          d="M325.25,122.76c-.72-4.01-6.12-31.53-32.58-46.98-23.57-13.76-47.03-8.1-51.58-6.9-1.4-6.79-7.29-31.26-30.42-49.66C189.48,2.37,166.8.92,159.48.75c-7.49.73-34.37,4.26-55.89,26.89-15.27,16.06-20.3,33.81-22.07,42.06-4.27-1.01-29.25-6.5-52.06,8.98-2.26,1.54-17.23,11.99-24.21,31.13-4.2,11.52-3.58,20.91-3.97,20.9-.66-.01-1.1-26.68-.47-130.22,108.15.01,216.3.02,324.45.03,0,40.74,0,81.48,0,122.22Z"
          fill={useFill ? fillColor : "none"}
          stroke={useFill ? "none" : strokeColor}
          strokeMiterlimit={10}
        />
      </g>
    </svg>
  );
};

export default TempleTopIcon;
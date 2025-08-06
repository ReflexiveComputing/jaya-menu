import { DynamicIcon, IconName } from "lucide-react/dynamic";
import React from "react";

interface AllergenButtonProps {
  title: string;
  description: string;
  onClick?: () => void;
  icon?: string;
  iconSize?: number;
}

export const OptionsItem: React.FC<AllergenButtonProps> = ({
  title,
  description,
  onClick,
  icon = "alert-triangle",
  iconSize = 24,
}) => (
  <button
    className="w-full flex items-center gap-4 bg-white  shadow p-2"
    onClick={onClick}
  >
    <span>
      <DynamicIcon name={icon as IconName} size={iconSize} color="#000" />
    </span>
    <div className="flex-1 text-left">
      <div className="font-semibold">{title}</div>
      <div className="text-xs text-gray-500">
        {description}
      </div>
    </div>
    <span className="text-gray-500">&gt;</span>
  </button>
);
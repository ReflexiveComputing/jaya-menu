import * as React from "react"
import { DynamicIcon, IconName } from "lucide-react/dynamic"

interface FoodTagsProps {
    tags: string[]
    iconSize?: number
    className?: string
    color?: string
}

export function FoodTags({
    tags,
    iconSize = 16,
    className,
    color,
}: FoodTagsProps) {
    if (tags.length === 0) tags = ["bean", "pizza", "ham"]
    return (
        <div className="m-auto mt-1 pr-2 flex flex-col gap-2">
            {tags.map((tag, idx) => (
                <div key={tag + idx} className="  m-auto flex items-center justify-center">
                    <DynamicIcon name={tag as IconName} size={iconSize} color={color || "#fff"} />
                </div>
            ))}
        </div>
    )
}
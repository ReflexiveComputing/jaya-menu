import * as React from "react"
import { DynamicIcon, IconName } from "lucide-react/dynamic"

interface FoodTagsProps {
    tags: string[]
    iconSize?: number
    className?: string
    fill?: string
}

export function FoodTags({
    tags,
    iconSize = 24,
    className,
    fill = "#000",
}: FoodTagsProps) {
    if (!tags || tags.length === 0) return (<div style={{ width: "40px", height: "32px" }} />)
    return (
        <div className="flex gap-1">
            {tags.map((tag, idx) => (
                <div key={tag + idx} className="w-8 h-8 rounded-full flex items-center justify-center">
                    <DynamicIcon name={tag as IconName} size={iconSize}  fill={fill} color="#FFF" />
                </div>
            ))}
        </div>
    )
}
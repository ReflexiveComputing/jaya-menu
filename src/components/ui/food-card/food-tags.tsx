import * as React from "react"
import { DynamicIcon, IconName } from "lucide-react/dynamic"

interface FoodTagsProps {
    tags: string[]
    iconSize?: number
    className?: string
}

export function FoodTags({
    tags,
    iconSize = 22,
    className,
}: FoodTagsProps) {
    if (!tags || tags.length === 0) return (<div style={{ width: "40px", height: "32px" }} />)
    return (
        <div className="flex gap-1">
            {tags.map((tag, idx) => (
                <div key={tag + idx} className="w-8 h-8 rounded-full flex items-center justify-center">
                    <DynamicIcon name={tag as IconName} size={iconSize} color="#000" />
                </div>
            ))}
        </div>
    )
}
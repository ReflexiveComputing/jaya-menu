import * as React from "react"
import { DynamicIcon, IconName } from "lucide-react/dynamic"
import { Icon } from '@iconify-icon/react';

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
    return (
        <div className="m-auto mt-1 pr-2 flex flex-col gap-2">
            {tags.map((tag, idx) => (
                <div key={tag + idx} className={`m-auto flex items-center justify-center text-[${color}] w-4 h-4`}>
                    <Icon className={"w-full h-full"} icon={tag} />
                </div>
            ))}
        </div>
    )
}
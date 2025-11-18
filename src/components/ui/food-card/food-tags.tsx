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
    const text = `text-[${color || '#E4C4AE'}]`
    return (
        <div className={`m-auto mt-1 pr-2 items-center justify-center flex flex-col gap-2 ${text}`}>
            {tags.map((tag, idx) => (
                <div key={tag + idx} className={`flex w-5 h-5`}>
                    <Icon className={"w-5 h-5"} icon={tag} />
                </div>
            ))}
        </div>
    )
}
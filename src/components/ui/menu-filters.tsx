import * as React from "react"
import { Button } from "./button"

interface Category {
    id: string
    label: string
}

interface MenuFiltersProps {
    categories: Category[]
    activeFilters: string[]
    toggleMenuFilters: (categoryId: string) => void

}

export function MenuFilters({
    categories,
    activeFilters,
    toggleMenuFilters,
}: MenuFiltersProps) {
    return (
        <div className="bg-white border-b border-gray-200">
            <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-3 px-4 py-4 min-w-max">
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            onClick={() => toggleMenuFilters(category.id)}
                            variant={activeFilters.includes(category.id)? "navSelected" : "navBasic"}
                        >
                            {category.label}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    )
}
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "absolute top-4 left-4 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium",
  {
    variants: {
      color: {
        gold: "bg-yellow-300 text-yellow-900",
        green: "bg-green-400 text-green-900",
        purple: "bg-purple-400 text-purple-900",
        default: "bg-white/90 text-gray-800",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
)

interface FoodBadgeProps extends VariantProps<typeof badgeVariants> {
  badge?: string
  showBadge?: boolean
}

export function FoodBadge({ badge, showBadge = false, color }: FoodBadgeProps) {
  if (!showBadge || !badge) return null

  return (
    <div className={cn(badgeVariants({ color }))}>
      {badge}
    </div>
  )
}
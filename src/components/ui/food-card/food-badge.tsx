import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  " absolute top-4 left-4 backdrop-blur-sm px-3  py-1 rounded-sm text-xs font-bold",
  {
    variants: {
      color: {
        gold: "bg-global-gold text-white",
        green: "bg-global-green text-white",
        purple: "bg-global-red text-white",
        default: "bg-global-lightblue text-white",
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
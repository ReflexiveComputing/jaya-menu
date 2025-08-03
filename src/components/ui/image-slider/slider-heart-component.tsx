import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"

const heartVariants = cva(
  "w-5 h-5", // base size for icon
  {
    variants: {
      variant: {
        default: " text-gray-600",
        green: "fill-green-600 text-green-600",
        red: "fill-red-500 text-red-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// Helper function to get icon classes based on liked and variant
function getHeartIconClass(liked: boolean, variant: "default" | "green" | "red" = "default") {
  return liked ? heartVariants({ variant }) : heartVariants({ variant: "default" })
}

interface HeartProps extends VariantProps<typeof heartVariants> {
  className?: string
  liked?: boolean
  likes?: number
  toggleFavorite: () => void
}

export function ImageSliderHeartComponent({
  className,
  liked = false,
  likes,
  variant = "default",
  toggleFavorite,
  ...props
}: HeartProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("Heart clicked")
    toggleFavorite()
  }

  return (
    <button
      className={cn(
        "absolute z-10 top-4 right-4 backdrop-blur-sm rounded-full p-2 transition-colors bg-white/90 text-gray-600",
        className
      )}
      {...props}
      onClick={handleClick}
    >
      <Heart className={getHeartIconClass(liked, variant ?? undefined)} />
      {typeof likes === "number" && (
        <span className="absolute -top-1 -right-1  text-gray-600 text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {likes}
        </span>
      )}
    </button>
  )
}
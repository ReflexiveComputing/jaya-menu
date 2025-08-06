import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ChevronLeft } from "lucide-react"

const headerVariants = cva(
  "bg-white border-b border-gray-200 z-10 transition-transform duration-300",
  {
    variants: {
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      size: {
        default: "py-4 px-4",
        sm: "py-2 px-2",
        lg: "py-6 px-6",
      },
    },
    defaultVariants: {
      align: "center",
      size: "default",
    },
  }
)

interface HeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof headerVariants> {
  title: string
  showChevron?: boolean
  linkTo?: string
}

export function Header({
  title,
  showChevron = false,
  linkTo = "/menu",
  align,
  size,
  className,
  ...props
}: HeaderProps) {

  return (
    <div
      className={cn(
        headerVariants({ align, size, className }),
      )}
      {...props}
    >
      <div className="flex items-center">
        {showChevron && (
          <Link href={linkTo} className="mr-4">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Link>
        )}
        <div className="flex-1">
          <h1 className={cn("text-2xl font-bold", align && `text-${align}`)}>
            {title}
          </h1>
        </div>
      </div>
    </div>
  )
}
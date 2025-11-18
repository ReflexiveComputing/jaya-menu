import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ArrowLeft, EllipsisVertical } from "lucide-react"
import { NavigateBack } from "./navigate-back"

const headerVariants = cva(
  "border-b border-app-dark-highlight z-10 transition-transform duration-300",
  {
    variants: {

      size: {
        default: "pt-8 pb-4 px-4",
        sm: "py-2 px-2",
        lg: "py-6 px-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

interface HeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof headerVariants> {
  title: string
  titleHighlighted?: boolean
  titleLink?: string,
  secondaryTitleLink?: string,
  secondaryTitle?: string
  showChevron?: boolean
  showMenuIcon?: boolean
  linkTo?: string
  
}

export function Header({
  title,
  secondaryTitle,
  titleLink,
  secondaryTitleLink,
  showChevron = false,
  linkTo = "/food",
  size,
  className,
  showMenuIcon = true,
  titleHighlighted = true,
  ...props
}: HeaderProps) {

  return (
    <div
      className={cn(
        headerVariants({ size, className }),
      )}
      {...props}
    >
      <div className="flex items-center">
        {showChevron && (
         <NavigateBack className="absolute mr-4 text-white" />
        )}
        <div className="m-auto w-5/6 flex">
        <Link href={titleLink??"#"} className="w-1/2">
        
            <h1 className={`w-full text-2xl font-medium font-[family-name:var(--font-fjalla-one)] text-left ${titleHighlighted ? 'text-gray-50' : 'text-gray-950'}`}>
            {title}
           
          </h1>
        </Link>
        {secondaryTitle && (
          <Link href={secondaryTitleLink??"#"} className="w-1/2">
            <h1 className={`w-full text-2xl pl-2 font-medium font-[family-name:var(--font-fjalla-one)] text-right ${titleHighlighted ? 'text-gray-950' : 'text-gray-50'}`}>
              {secondaryTitle}
            </h1>
          </Link>
        )}
        </div>
        {showMenuIcon && (
          <div className="absolute right-4">
            <EllipsisVertical className="w-6 h-6 text-gray-50" />
          </div>
        )}
      </div>
    </div>
  )
}
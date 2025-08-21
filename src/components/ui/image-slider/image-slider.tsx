"use client"

import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "../carousel"
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headerVariants = cva(
  "bg-muted",
  {
    variants: {

      size: {
        default: "h-96",
        sm: "h-42",
        md: "h-72",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const counterVariants = cva(
  "absolute right-2 text-muted-foreground py-2 text-right text-sm px-2",
  {
    variants: {

      margin: {
        default: "bottom-2",
        sm: "bottom-2",
        md: "bottom-6",
      },
    },
    defaultVariants: {
      margin: "default",
    },
  }
)

export function ImageSlider(
  { className, size, images, margin, ...props }: React.HTMLAttributes<HTMLDivElement>
    & VariantProps<typeof headerVariants>
    & VariantProps<typeof counterVariants>
    & { images: string[] }) {

  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  React.useEffect(() => {
    if (!api) {
      return
    }
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  // compute header class once so we can reuse the height class for the image
  const headerClass = headerVariants({ size })

  return (
    <div
      className={cn(
        headerClass,
        className,
      )}
      {...props}
    >

      <Carousel setApi={setApi} >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} >
                {
                  (() => {
                    // Extract the first height class (h-*) from headerClass and apply it to the image
                    const imgHeightClass = (headerClass.split(/\s+/).find(c => c.startsWith('h-')) || 'h-96')
                    return (
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={image}
                        width={300}
                        height={200}
                        className={`w-full object-contain ${imgHeightClass}`}
                      />
                    )
                  })()
                }
            </CarouselItem>

          ))}

        </CarouselContent>
      </Carousel>
      <div className={cn(counterVariants({ margin: margin }))}>
        {current} / {count}
      </div>


    </div>


  )
}

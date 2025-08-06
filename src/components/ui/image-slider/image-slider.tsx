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
        sm: "h-48",
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

  return (
    <div
      className={cn(
        headerVariants({ size, className }),
      )}
      {...props}
    >

      <Carousel setApi={setApi} >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} >
              <Image
                src={image || "/placeholder.svg"}
                alt={image}
                width={300}
                height={200}
                className="w-full h-full object-contain"
              />
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

"use client"

import Link from "next/link"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "../carousel"
import * as React from "react"
import { HeartCounter } from "../food-card/heart-component"
import { ImageSliderHeartComponent } from "./slider-heart-component"
export function ImageSlider({ images }: { images: string[] }) {

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
        <div className="relative h-96 bg-muted">

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
            <div className="text-muted-foreground py-2 text-right text-sm px-2">
                {current} / {count}
            </div>


        </div>


    )
}

"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

interface ComboCardProps {
    image?: string // path under /public, e.g. '/background-1.png'
    title: string
    subtitle?: string
    tag?: string
    href?: string
    className?: string
    items?: { id: number|string, name: string, image: string, description?: string, price?: number }[]

}

// Mosaic for combos with no image, but with items
import type { StaticImageData } from "next/image"
function ComboMosaic({ items }: { items: { id: number|string, image: string, name: string }[] }) {
    // Only show up to 3 items for now
    const [main, ...rest] = items.slice(0, 3)
    return (
        <div className="absolute inset-0 flex flex-col h-5/6 w-full rounded-md p-2 overflow-hidden gap-2 ">
            {/* Top: main image, full width, half height */}
            {main && (
                <div className="relative w-full h-2/3 m-auto">
                    <Image
                        src={main.image}
                        alt={main.name}
                        fill
                        className="object-contain m-auto  bg-white rounded-lg "
                        sizes="100vw"
                        priority={false}
                    />
                </div>
            )}
            {/* Bottom: two images, row, each w-1/2 h-1/2 */}
            <div className="flex flex-row w-full h-1/3 flex-1 gap-2 ">
                {rest.map((item, idx) => (
                    <div key={item.id} className="relative w-1/2 h-full flex items-center justify-center ">
                        <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-center object-contain w-full bg-white rounded-lg "
                            sizes="50vw"
                            priority={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export function ComboCard({ image, title, subtitle, tag, href, className, items }: ComboCardProps) {
    const card = (
        <div
            className={
                // important: flex-shrink-0 + fixed width so horizontal flex row doesn't collapse
                "flex-shrink-0 justify-center w-82 sm:w-80 md:w-72 rounded-sm " +
                "overflow-hidden shadow-sm relative " +
                "min-h-135 " +
                className
            }
        >
            {/* set explicit height so Image with fill has a container */}
            <div className="absolute h-full w-full z-0">
                {image !== "" && image ? (
                    <>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 240px) 50vw, (max-width: 240px) 33vw, 12rem"
                            priority={false}
                        />
                        {/* Gradient overlay only for main image */}
                        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/80 via-black/20 to-black/0" />
                    </>
                ) : items && items.length ? (
                    <ComboMosaic items={items} />
                ) : (
                    <div className="absolute inset-0 bg-gray-200" />
                )}
            </div>
            {/* Text at the bottom, above overlay */}
            <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center w-full text-white z-20 pb-6">
                <h3 className="text-3xl uppercase text-center font-semibold drop-shadow-md font-fajala">{title}</h3>
                {subtitle && <p className="text-lg opacity-90 mt-1 drop-shadow-sm">{subtitle}</p>}
            </div>
        </div>
    )

    if (href) {
        return (
            <Link href={href} className="block">
                {card}
            </Link>
        )
    }

    return card
}

export default ComboCard

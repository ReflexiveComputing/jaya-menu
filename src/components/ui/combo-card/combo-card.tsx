"use client"

import React from "react"
import Image from "next/image"
import Link from "next/link"

interface ComboCardProps {
    image: string // path under /public, e.g. '/background-1.png'
    title: string
    subtitle?: string
    tag?: string
    href?: string
    className?: string
}

export function ComboCard({ image, title, subtitle, tag, href, className }: ComboCardProps) {
    const card = (
        <div
            className={
                // important: flex-shrink-0 + fixed width so horizontal flex row doesn't collapse
                "flex-shrink-0 w-82 sm:w-80 md:w-72 rounded-sm " +
                "overflow-hidden shadow-sm relative " +
                "min-h-145 " +
                className
            }
        >
            {/* set explicit height so Image with fill has a container */}
            <div className="relative h-80">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 240px) 50vw, (max-width: 240px) 33vw, 12rem"
                    priority={false}
                />
            </div>
            <div className="flex flex-col  pt-6 items-center w-full text-white ">
                <h3 className="text-4xl uppercase text-center font-semibold drop-shadow-md">{title}</h3>
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

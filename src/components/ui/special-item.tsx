import Image from "next/image"
import { getLocale } from "next-intl/server"
import { MenuItemFull } from "@/types/menu"
import { fetchMenuItemFromApi } from "@/lib/server/drink-fetch-api"

interface SpecialItemProps {
    accentColor?: string
}

export default async function SpecialItem({ accentColor = "#FEBD3A" }: SpecialItemProps) {
    const locale = await getLocale()
    const item: MenuItemFull | null = await fetchMenuItemFromApi(locale)
    console.log("Special item fetched:", item)

    if (!item) {
        return (
            <div className="w-full max-w-3xl mx-auto rounded-xl overflow-hidden bg-app-background flex items-center justify-center p-8">
                <div className="text-gray-400">Special not available</div>
            </div>
        )
    }

    const title = item.name || "Special"
    const description = item.description || item.shortDescription || ""
    const price = typeof item.price === "number" ? item.price.toFixed(2) : ""
    const imgUrl = item.mainImage?.url ?? item.images?.[0]?.url ?? null

    return (
        <div className="w-full max-w-3xl min-h-[50vh] mx-auto relative overflow-hidden flex">

            <div className="m-auto absolute w-[70vh] -top-10 left-20 opacity-55">
                <Image
                    src="https://snhltnwklxscjle7.public.blob.vercel-storage.com/jaya-public/Yaka_illust_png.png"
                    alt="Yaya Logo"
                    width={300}
                    height={300}
                    className="object-cover"
                    priority
                />
            </div>

            {/* Left info column */}
            <div className="w-60 text-white p-6 flex flex-col justify-end gap-4">
                <div>
                    <h3 className="uppercase text-2xl text-right font-bold tracking-wide" style={{ color: accentColor }}>
                        {title}
                    </h3>
                </div>

                <div className="flex items-end justify-end text-right">
                    <div className="text-right">
                        <div className="text-xl flex font-extrabold" style={{ color: accentColor }}>
                            <p>€</p>
                            <p className="text-white px-1">{price}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right media column */}
            <div className="flex-1 relative z-20 bg-app-background pt-10">
                {imgUrl ? (
                    <div className="relative h-full">
                        <Image
                            src={imgUrl}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, 500px"
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="h-full w-full flex items-center justify-center">
                        <span className="text-lg font-semibold text-white/90">No image</span>
                    </div>
                )}
            </div>
        </div>
    )
}

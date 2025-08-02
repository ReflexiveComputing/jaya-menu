"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-5">
        {/* Hero Food Image */}
        <div className="mb-6">
          <div className="relative w-80 h-80 mx-auto">
            <Image
              src="/nila-1st-image.png"
              alt="Delicious Mexican nachos with toppings"
              width={320}
              height={320}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-gray-900 mb-4 tracking-tight">HUNGRY?</h1>
          <p className="text-xl text-gray-700 font-medium">Lets Get Started!</p>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-4">
          <Button variant="primary" asChild>
            <Link href="/surprise" className="w-block">
             Help me choose!
            </Link>
          </Button>

          <Button variant="secondary" asChild>
            <Link href="/menu" className="w-block">
             Show Menu
            </Link>
          </Button>
        </div>
      </div>

            {/* Language Selector */}
      <div className="w-full  bottom-0 right-0 flex justify-end p-4">
        <div className="text-center bg-white border border-gray-300 px-3 py-2 rounded text-sm font-medium text-gray-700 w-12">EN</div>
      </div>
    </div>
  )
}

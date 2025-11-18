"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface NavigateBackProps {
  className?: string
}

export function NavigateBack({ className }: NavigateBackProps) {
  const router = useRouter()

  return (
    <button 
      onClick={() => router.back()} 
      className={className || "absolute top-4 left-4 z-20 backdrop-blur-sm rounded-full p-2 text-app-dark-highlight"}
    >
      <ArrowLeft className="w-6 h-6 " />
    </button>
  )
}

"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/ui/header"

export default function ThankYouPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title="Thank you!" />

      <div className="flex-1 px-6 py-12 flex flex-col items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>

          {/* Thank You Message */}
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Thank you for your feedback!
            </h1>
            <p className="text-gray-600 leading-relaxed">
              We appreciate you taking the time to share your thoughts with us.
              Your feedback helps us improve and provide a better dining experience for everyone.
            </p>
            <p className="text-sm text-gray-500">
              {"We can't respond individually, but we'll pass it on to the teams who are working to help make our restaurant better for everyone."}

            </p>
          </div>

          {/* Action Button */}
          <div className="pt-8">
            <Button
              onClick={() => router.push("/menu")}
              className="w-full"
              size="lg"
            >
              Back to Menu
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

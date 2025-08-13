"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Header } from "@/components/ui/header"
import {useTranslations} from 'next-intl';

export default function FeedbackPage() {
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations('Feedback');
  const tCommon = useTranslations('Common');

  const feedbackSchema = z.object({
    rating: z.number().min(1, t('validation.selectRating')).max(5),
    category: z.string().min(1, t('validation.selectCategory')),
    details: z.string().min(2, t('validation.minDetails')),
  })

  type FeedbackFormData = z.infer<typeof feedbackSchema>

  const categories = [
    { key: "foodQuality", label: t('categories.foodQuality') },
    { key: "service", label: t('categories.service') },
    { key: "menuVariety", label: t('categories.menuVariety') },
    { key: "atmosphere", label: t('categories.atmosphere') },
    { key: "pricing", label: t('categories.pricing') },
    { key: "cleanliness", label: t('categories.cleanliness') },
    { key: "waitTime", label: t('categories.waitTime') },
    { key: "appExperience", label: t('categories.appExperience') },
    { key: "delivery", label: t('categories.delivery') },
    { key: "other", label: t('categories.other') }
  ]

  const form = useForm<FeedbackFormData>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      rating: 0,
      category: "",
      details: "",
    },
  })

  const handleStarClick = (starRating: number) => {
    setRating(starRating)
    form.setValue("rating", starRating)
  }

  const onSubmit = async (data: FeedbackFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push("/feedback/thank-you")
      } else {
        console.error("Failed to submit feedback")
      }
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header title={t('title')} />
      
      <div className="flex-1 px-6 py-6">
        <div className="max-w-md mx-auto">
          <p className="text-gray-600 mb-8 text-center">
            {t('subtitle')}
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Star Rating */}
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      {t('ratingQuestion')}
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-1 py-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleStarClick(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`w-8 h-8 transition-colors ${
                                star <= (hoverRating || rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Selection */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('categoryLabel')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.key} value={category.key}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Feedback Details */}
              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('detailsLabel')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('detailsPlaceholder')}
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {tCommon('cancel')}
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t('submitting') : t('submitButton')}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export default function SurprisePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const router = useRouter()
  const t = useTranslations('Surprise');

  const questions = [
    {
      id: 1,
      question: t('questions.memories'),
      answers: [
        t('answers.grandmothersKitchen'),
        t('answers.streetFood'),
        t('answers.familyDinners'),
        t('answers.weekendBarbecues')
      ],
    },
    {
      id: 2,
      question: t('questions.mealTime'),
      answers: [
        t('answers.quickBreakfast'),
        t('answers.heartyLunch'),
        t('answers.lateNightSnack'),
        t('answers.weekendBrunch')
      ],
    },
    {
      id: 3,
      question: t('questions.adventurous'),
      answers: [
        t('answers.keepClassic'),
        t('answers.mildExploration'),
        t('answers.bringHeat'),
        t('answers.surpriseMe')
      ],
    },
  ]

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)

    // Add a small delay for visual feedback before moving to next question
    setTimeout(() => {
      const newAnswers = [...selectedAnswers, answer]
      setSelectedAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        // Quiz completed, redirect to menu with results
        router.push("/menu?surprise=true")
      }
    }, 500)
  }

  const currentQ = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center px-4 py-4">
          <Link href="/" className="mr-4">
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Title Section */}
        <div className="bg-white px-6 py-12 text-center border-b border-gray-200">
          <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
            {t('discoverYourTaste')}
          </h1>
          <p className="text-lg text-gray-600 font-medium">{t('answerFewQuestions')}</p>
        </div>

        {/* Question Section */}
        <div className="bg-white px-6 py-8 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 text-center">{currentQ.question}</h2>
        </div>

        {/* Answers Grid */}
        <div className="flex-1 bg-white">
          <div className="grid grid-cols-2 h-full">
            {currentQ.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(answer)}
                className={`
                  flex items-center justify-center p-6 text-lg font-medium border border-gray-200 
                  transition-all duration-200 hover:bg-gray-50 active:scale-95
                  ${selectedAnswer === answer ? "bg-yellow-400 text-gray-900" : "bg-white text-gray-900"}
                `}
              >
                <span className="text-center leading-relaxed">{answer}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="bg-white px-6 py-6 border-t border-gray-200">
          <div className="flex gap-2 justify-center">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 max-w-20 rounded-full transition-colors duration-300 ${index <= currentQuestion ? "bg-yellow-400" : "bg-gray-200"
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Language Switcher */}
      <div className="w-full bottom-0 right-0 flex justify-end p-4">
        <LanguageSwitcher />
      </div>
    </div>
  )
}

"use client"

/*
Colors used in this component:
- Background overlay: rgba(0, 0, 0, 0.3) - Dark overlay for text readability
- Button default: rgba(255, 255, 255, 0.15) - Semi-transparent white
- Button hover: rgba(255, 255, 255, 0.25) - Slightly more opaque white
- Button selected: rgba(255, 255, 255, 0.9) - Nearly opaque white
- Text color: white for contrast
- Selected text: rgba(139, 69, 19, 1) - Saddle brown to match earth tones
- Progress indicator: rgba(255, 255, 255, 0.8) - Semi-transparent white
- Progress background: rgba(255, 255, 255, 0.2) - Very transparent white
*/

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"

export default function SurpriseQuiz({ questions }: { questions: { id: number, question: string, answers: string[] }[] }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const router = useRouter()

    const handleAnswerSelect = (answer: string) => {
        setSelectedAnswer(answer)
        setTimeout(() => {
            const newAnswers = [...selectedAnswers, answer]
            setSelectedAnswers(newAnswers)
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1)
                setSelectedAnswer(null)
            } else {
                router.push("/food")
            }
        }, 500)
    }

    const currentQ = questions[currentQuestion]

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Background Image */}
            <Image
                src="/mitho whiteboard-2.jpg"
                alt="Quiz background"
                fill
                className="object-cover"
                priority
                sizes="100vw"
            />

            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col">
                <div className="pt-6 px-6">
                    <Progress
                        className="m-auto w-4/5 h-6"
                        indicatorClassName="bg-orange-600/80"
                        rootClassName="bg-orange-600/30"
                        value={((currentQuestion + 1) / questions.length) * 100}
                    />
                    <div className="px-6 text-center">
                        <h2 className="text-4xl font-extrabold pt-10 mb-8 text-orange-600 drop-shadow-lg">
                            {currentQ.question}
                        </h2>
                    </div>
                </div>

                <div className="m-auto flex-1 flex flex-col justify-center">
                    <div className="px-6 text-center">
                        <h3 className="text-xl font-extrabold mb-8 text-orange-600 drop-shadow-lg">
                            {currentQ.question}
                        </h3>
                        <div className="flex flex-col gap-4 max-w-md mx-auto">
                            {currentQ.answers.map((answer, idx) => (
                                <button
                                    key={idx}
                                    className={`w-full py-4 px-6 bg-orange-300/60 hover:bg-orange-300/80 text-orange-800 text-lg font-medium rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20
                    ${selectedAnswer === answer
                                            ? "bg-orange-200/90 text-amber-900 shadow-lg transform scale-105"
                                            : "bg-orange-200/15 text-orange-500 hover:transform hover:scale-102"}
                  `}
                                    onClick={() => handleAnswerSelect(answer)}
                                    disabled={!!selectedAnswer}
                                >
                                    {answer}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
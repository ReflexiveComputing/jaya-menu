"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { Button } from "../button"
import { StepProgress } from "../step-progress"


export default function SurpriseQuiz({ questions }: { questions: { id: number, question: string, answers: string[] }[] }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const router = useRouter()

    // Map question index -> background class (easy to edit / extend)
    const bgClasses = [
        'bg-global-red',
        'bg-global-blue',
        'bg-global-green',
        'bg-global-lightblue',
        'bg-global-gold'
    ]

    const currentBg = bgClasses[currentQuestion % bgClasses.length]

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
        <div className={`min-h-screen relative overflow-hidden ${currentBg}`}>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col">
                <div className="pt-6 px-6">
                    <StepProgress
                        className="m-auto w-4/5 h-6"
                        steps={questions.length}
                        value={currentQuestion + 1}
                    />

                    <div className="relative h-70 mt-5">
                        <Image
                            src={`/masks/mask-${currentQuestion + 1}.png`}
                            alt={"mask1"}
                            fill
                            className="object-contain"
                            sizes="(max-width: 240px) 50vw, (max-width: 240px) 33vw, 12rem"
                            priority={false}
                        />
                    </div>
                   
                </div>

                <div className="m-auto py-6 flex-1 flex flex-col ">
                     <div className="px-6 text-center">
                        <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">
                            {currentQ.question}
                        </h2>
                    </div>
                    <div className="px-6 py-6 text-center">
                        <div className="flex flex-col gap-4 mx-auto max-w-sm ">
                            {currentQ.answers.map((answer, idx) => (
                                <Button className="text-lg font-semibold h-24 text-center text-wrap" size="mid" variant="surpriseMeSecondary" key={idx} onClick={() => handleAnswerSelect(answer)}>
                                    {answer}
                                </Button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
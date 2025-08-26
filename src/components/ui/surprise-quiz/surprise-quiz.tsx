
"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { Button } from "../button"
import { StepProgress } from "../step-progress"


// Allergen selection buttons
function AllergenButtons({
    answers,
    selectedAllergens,
    handleAnswerSelect,
    onAllergenToggle,
}: {
    answers: string[];
    selectedAllergens: string[];
    handleAnswerSelect: (answer: string) => void;
    onAllergenToggle: (answer: string) => void;
}) {
    return (
        <>
            {/* First row: Single "All are welcome!" button */}
            <div className="">
                <Button
                    className={`text-lg font-semibold h-20 w-full text-center text-wrap`}
                    size="mid"
                    variant={"surpriseMeSecondary"}
                    onClick={() => handleAnswerSelect(answers[0])}
                >
                    {answers[0]}
                </Button>
            </div>
            {/* Second row: Allergen options in 2-column grid */}
            <div className="grid grid-cols-2 gap-3">
                {answers.slice(1).map((answer, idx) => (
                    <Button
                        className={`text-lg font-semibold h-16 text-center text-wrap ${selectedAllergens.includes(answer)
                                ? 'bg-white text-gray-900 border-2 border-white'
                                : ''
                            }`}
                        size="mid"
                        variant={selectedAllergens.includes(answer) ? "default" : "surpriseMeSecondary"}
                        key={idx}
                        onClick={() => onAllergenToggle(answer)}
                    >
                        {answer}
                    </Button>
                ))}
            </div>
            {/* Confirm button at bottom, only if at least one allergen is selected */}
            {selectedAllergens.length > 0 && (
                <Button
                    className="text-lg font-semibold h-16 bg-white text-gray-900 hover:bg-gray-100 border-2 border-white"
                    size="mid"
                    variant="default"
                    onClick={() => handleAnswerSelect("")}
                >
                    Confirm
                </Button>
            )}
        </>
    );
}

// Regular question answer buttons
function QuestionButtons({ answers, handleAnswerSelect }: { answers: string[]; handleAnswerSelect: (answer: string) => void }) {
    return (
        <>
            {answers.map((answer, idx) => (
                <Button
                    className="text-lg font-semibold h-24 text-center text-wrap"
                    size="mid"
                    variant="surpriseMeSecondary"
                    key={idx}
                    onClick={() => handleAnswerSelect(answer)}
                >
                    {answer}
                </Button>
            ))}
        </>
    );
}


export default function SurpriseQuiz({ questions }: { questions: { id: number, question: string, answers: string[] }[] }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [selectedAllergens, setSelectedAllergens] = useState<string[]>([])
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

    // Check if current question is the allergens question (question 3, index 2)
    const isAllergensQuestion = currentQuestion === 2

    // Handles toggling allergen selection
    const handleAllergenToggle = (allergen: string) => {
        setSelectedAllergens(prev =>
            prev.includes(allergen)
                ? prev.filter(item => item !== allergen)
                : [...prev, allergen]
        );
    };



    // Handles answer selection for regular questions
    const handleAnswerSelect = (answer: string) => {
        setSelectedAnswers(prev =>
            answer === ""
                ? [...prev, ...selectedAllergens]
                : [...prev, answer]
        );
        setSelectedAnswer(answer);
        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setSelectedAllergens([]);
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
            } else {
                router.push("/food");
            }
        }, 500);
    };

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
                            {isAllergensQuestion ? (
                                <AllergenButtons
                                    answers={currentQ.answers}
                                    selectedAllergens={selectedAllergens}
                                    handleAnswerSelect={handleAnswerSelect}
                                    onAllergenToggle={handleAllergenToggle}
                                />
                            ) : (
                                <QuestionButtons
                                    answers={currentQ.answers}
                                    handleAnswerSelect={handleAnswerSelect}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
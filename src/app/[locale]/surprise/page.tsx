import { LanguageSwitcher } from "@/components/ui/language-switcher"
import SurpriseQuiz from "@/components/ui/surprise-quiz/surprise-quiz"
import { getTranslations } from "next-intl/server"

export default async function SurprisePage() {
  const t = await getTranslations('Surprise')

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

  // You must move all interactive logic (state, handlers) to a client component!
  // Render a client component for the quiz logic and pass `questions` as prop

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <SurpriseQuiz questions={questions} />
      </div>
    </div>
  )
}
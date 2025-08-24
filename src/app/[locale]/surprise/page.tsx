import SurpriseQuiz from "@/components/ui/surprise-quiz/surprise-quiz"
import { getTranslations } from "next-intl/server"

export default async function SurprisePage() {
  const t = await getTranslations('Surprise')

  const questions = [
    {
      id: 1,
      title: "Himalayan Warmth",
      question: "The mountains can be gentle or fierce — how warm should your flavors be today?",
      answers: [
        "Gentle as a spring breeze",
        "Warming like a mountain hearth",
        "Fiery as a Himalayan trail"
      ],
    },
    {
      id: 2,
      title: "Ancient Paths",
      question: "Which path shall we walk together?",
      answers: [
        "The Tibetan road — momos, thukpa & sizzling woks",
        "The Nepalese heartland — dal bhat, tarkari & curry",
        "A fusion trek — spices & ideas from all over Asia"
      ],
    },
    {
      id: 3,
      title: "Safe Ingredients",
      question: "The Himalayas offer many blessings, which ingredients should we gently leave out?",
      answers: [
        "Peanuts",
        "Dairy",
        "Gluten",
        "Crustaceans",
        "Eggs",
        "Mustard",
        "Sesame",
        "Soy",
        "Tree nuts",
        "None"
      ],
    },
    {
      id: 4,
      title: "Energy for the Journey",
      question: "Every traveler needs strength — what shall be yours?",
      answers: [
        "Chicken — for steady stamina",
        "Lamb — for bold strength",
        "Paneer — for comforting nourishment",
        "Tofu & vegetables — for light harmony"
      ],
    },
    {
      id: 5,
      title: "Feast or Retreat",
      question: "Shall tonight be a grand feast or a quiet retreat?",
      answers: [
        "A small plate, like a village tea break",
        "A full thali, like a family celebration",
        "A chef’s surprise, like an unplanned journey"
      ],
    },
    {
      id: 6,
      title: "Refreshment for the Soul",
      question: "From the peaks to the valleys, what shall quench your thirst?",
      answers: [
        "Tea & Coffee",
        "Soft Drinks & Juices",
        "Beer",
        "Wine",
        "Cocktails & Spirits"
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
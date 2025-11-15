import React from "react"
import { ChevronRight } from "lucide-react"

interface ComboSuggestionProps {
  combo: {
    id: number
    name: string
    description: string
  }
}

export const ComboSuggestion: React.FC<ComboSuggestionProps> = ({ combo }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h4 className="font-medium text-lg mb-2">{combo.name}</h4>
        <p className="text-gray-600">{combo.description}</p>
      </div>
      <ChevronRight className="w-6 h-6 text-gray-400 ml-4" />
    </div>
  )
}

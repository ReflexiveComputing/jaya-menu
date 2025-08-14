"use client"

import React from "react"
import { Header } from "@/components/ui/header"
import { SectionDivider } from "@/components/ui/section-divider"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
const foodPreferences = [
    { id: "spicy", label: "Spicy Food", description: "I enjoy spicy dishes" },
    {
        id: "non-alcohol",
        label: "Non-Alcoholic",
        description: "No alcoholic beverages",
    },
    { id: "vegetarian", label: "Vegetarian", description: "No meat products" },
    { id: "vegan", label: "Vegan", description: "No animal products" },
    {
        id: "gluten-free",
        label: "Gluten-Free",
        description: "No gluten-containing ingredients",
    },
    { id: "dairy-free", label: "Dairy-Free", description: "No dairy products" },
    { id: "low-sodium", label: "Low Sodium", description: "Reduced salt content" },
    { id: "organic", label: "Organic", description: "Prefer organic ingredients" },
]

const allergens = [
    { id: "peanuts", label: "Peanuts", description: "Tree nuts and peanuts" },
    { id: "shellfish", label: "Shellfish", description: "Shrimp, lobster, crab, etc." },
    { id: "fish", label: "Fish", description: "All types of fish" },
    { id: "eggs", label: "Eggs", description: "Chicken eggs and egg products" },
    { id: "milk", label: "Milk/Dairy", description: "Milk and dairy products" },
    { id: "soy", label: "Soy", description: "Soybeans and soy products" },
    { id: "wheat", label: "Wheat", description: "Wheat and wheat products" },
    { id: "sesame", label: "Sesame", description: "Sesame seeds and oil" },
]


export default function DietaryPreferencesPage() {
    const [selectedPreferences, setSelectedPreferences] = React.useState<string[]>([])
    const [selectedAllergens, setSelectedAllergens] = React.useState<string[]>([])
    const router = useRouter()
    const handlePreferenceChange = (preferenceId: string, checked: boolean) => {
        if (checked) {
            setSelectedPreferences(prev => [...prev, preferenceId])
        } else {
            setSelectedPreferences(prev => prev.filter(id => id !== preferenceId))
        }
    }

    const handleAllergenChange = (allergenId: string, checked: boolean) => {
        if (checked) {
            setSelectedAllergens(prev => [...prev, allergenId])
        } else {
            setSelectedAllergens(prev => prev.filter(id => id !== allergenId))
        }
    }

    const handleSave = () => {
        // later save this to the local storage to be used in backend calls.
        localStorage.setItem("foodPreferences", JSON.stringify(selectedPreferences))
        localStorage.setItem("allergens", JSON.stringify(selectedAllergens))

        console.log("Food Preferences:", selectedPreferences)
        console.log("Allergens:", selectedAllergens)
        // navigate back to /menu
        router.push("/menu")
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <Header title="Dietary Preferences" />

            <div className="px-4 py-6 space-y-8">
                {/* Food Preferences Section */}
                <div>
                    <SectionDivider title="Food Preferences" />
                    <div className="space-y-4 mt-6">
                        {foodPreferences.map(preference => {
                            const checked = selectedPreferences.includes(preference.id)
                            return (
                                <div
                                    key={preference.id}
                                    className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm border cursor-pointer select-none"
                                    onClick={() => handlePreferenceChange(preference.id, !checked)}
                                    role="checkbox"
                                    aria-checked={checked}
                                    tabIndex={0}
                                    onKeyDown={e => {
                                        if (e.key === " " || e.key === "Enter") {
                                            e.preventDefault()
                                            handlePreferenceChange(preference.id, !checked)
                                        }
                                    }}
                                >
                                    <Checkbox
                                        id={preference.id}
                                        checked={checked}
                                        onCheckedChange={checked => handlePreferenceChange(preference.id, checked as boolean)}
                                        className="mt-1 pointer-events-none"
                                    />
                                    <div className="flex-1">
                                        <label
                                            htmlFor={preference.id}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                        >
                                            {preference.label}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Allergens Section */}
                <div>
                    <SectionDivider title="Allergens" />
                    <div className="space-y-4 mt-6">
                        {allergens.map(allergen => {
                            const checked = selectedAllergens.includes(allergen.id)
                            return (
                                <div
                                    key={allergen.id}
                                    className="flex items-start space-x-3 p-4 bg-white rounded-lg shadow-xs border border-red-100 cursor-pointer select-none"
                                    onClick={() => handleAllergenChange(allergen.id, !checked)}
                                    role="checkbox"
                                    aria-checked={checked}
                                >
                                    <Checkbox
                                        id={allergen.id}
                                        checked={checked}
                                        onCheckedChange={checked => handleAllergenChange(allergen.id, checked as boolean)}
                                        className="mt-1 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 pointer-events-none"
                                    />
                                    <div className="flex-1">
                                        <label
                                            htmlFor={allergen.id}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                        >
                                            {allergen.label}
                                        </label>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Save Button */}
                <div className="pt-8 pb-20">
                    <Button
                        onClick={handleSave}
                        className="w-full bg-black text-white hover:bg-gray-800"
                    >
                        Save Preferences
                    </Button>
                </div>
            </div>
        </div>
    )
}

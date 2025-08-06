import React from "react"
import { AlertTriangle, Globe, MessageSquare, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Header } from "./header"
import { Button } from "./button"
import { OptionsItem } from "./options-item"

interface OptionsModalProps {
    open: boolean
    onClose: () => void
}

export function OptionsModal({ open, onClose }: OptionsModalProps) {
    React.useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [open])

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-background">
            {/* Header */}
            <Header title={"Options"} />

            {/* Options List */}
            <div className="flex-1 flex flex-col items-center justify-center w-full ">
                <div className="w-full flex flex-col gap-1">
                    {/* Option Card Example */}
                    <OptionsItem title={"Select Allergens"} description={"Manage your dietary restrictions"} icon="alert-triangle" />
                    <OptionsItem title={"Change Language"} description={"Switch to your preferred language"} icon="globe" />
                    <OptionsItem title={"Send Feedback"} description={"Help us improve your experience"} icon="message-square" />
                </div>
            </div>
            {/* Close Button at Bottom */}
            <div className="w-full px-6 pb-8 flex justify-end">
                <Button variant="outline" onClick={onClose}>
                    Close
                </Button>
            </div>
        </div>
    )
}


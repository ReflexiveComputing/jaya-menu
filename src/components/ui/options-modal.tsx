"use client"

import React from "react"
import { AlertTriangle, Globe, MessageSquare, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { Header } from "./header"
import { Button } from "./button"
import { OptionsItem } from "./options-item"
import Link from "next/link";

interface OptionsModalProps {
    open: boolean
    onClose: () => void
}

export function OptionsModal({ open, onClose }: OptionsModalProps) {
    const router = useRouter()
    
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

    const handleNavigationClick = (navigationPath: string) => {
        onClose()
        router.push(navigationPath)
    }




    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-background">
            {/* Header */}
            <Header title={"Options"} />

            {/* Options List */}
            <div className="flex-1 flex flex-col items-center justify-center w-full ">
                <div className="w-full flex flex-col gap-1">
                    {/* Option Card Example */}
                    <Link onClick={onClose} href="/surprise">
                        <OptionsItem
                            title={"Retake Quiz"}
                            description={"Retake the quiz and get new recommendations"}
                            icon="message-circle-question-mark"
                        />
                    </Link>
                    <OptionsItem
                        title={"Select Allergens"}
                        description={"Manage your dietary restrictions"}
                        icon="alert-triangle"
                    />
                    <OptionsItem
                        title={"Change Language"}
                        description={"Switch to your preferred language"}
                        icon="globe"
                    />
                    <Link onClick={onClose} href="/feedback">
                        <OptionsItem
                            title={"Send Feedback"}
                            description={"Help us improve your experience"}
                            icon="message-square"
                        />
                    </Link>
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


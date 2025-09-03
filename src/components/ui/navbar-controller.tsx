"use client"
import React from "react"
import { usePathname } from "next/navigation"

import { BottomNavbar } from "./bottom-navbar"
import { OptionsModal } from "./options-modal"
import { JoystickMenuNavbar } from "./joystick-menu-navbar"

export function NavbarController() {
      const pathname = usePathname()

  const [selectedNav, setSelectedNav] = React.useState<string>("")
  const [optionsOpen, setOptionsOpen] = React.useState(false)

  const handleNavClick = (nav: string) => {
    setSelectedNav(nav)
    if (nav === "options") {
      setOptionsOpen(true)
    } else {
      setOptionsOpen(false)
    }
  }
  // Hide navbar on main page "/"
  // Paths and patterns to hide navbar
  const hideNavbarPatterns = [
    /^\/$/,           // "/"
    /^\/de$/,         // "/de"
    /^\/surprise.*/,  // "/surprise*"
    /^\/de\/surprise.*/,  // "/de/surprise*"
  ]

  const shouldHideNavbar = hideNavbarPatterns.some((pattern) => pattern.test(pathname))
  if (shouldHideNavbar) return null
  return (
    <>
      <JoystickMenuNavbar selectedNav={selectedNav} onNavClick={handleNavClick} />
      <OptionsModal open={optionsOpen} onClose={() => setOptionsOpen(false)} />
    </>
  )
}

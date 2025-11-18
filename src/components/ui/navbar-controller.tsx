"use client"
import React from "react"
import { usePathname } from "next/navigation"

import { BottomNavbar } from "./bottom-navbar"
import { OptionsModal } from "./options-modal"
import { JoystickNavigation } from "./joystick-navigation"
import { useNavbar } from "@/components/providers/navbar-provider"


export function NavbarController() {
  const { selectedNav, setSelectedNav } = useNavbar()
  const pathname = usePathname()
  const { optionsOpen, setOptionsOpen } = useNavbar()
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
    /^\/$/,                     // "/"
    /^\/(en|de|es|fr|hi)$/,     // "/:locale"
    /^\/surprise.*/,            // "/surprise*"
    /^\/(en|de|es|fr|hi)\/surprise.*/,  // "/:locale/surprise*"
    /^\/item.*/,                // "/item" and "/item/*"
    /^\/(en|de|es|fr|hi)\/item.*/,      // "/:locale/item" and "/:locale/item/*"
    /^\/wishlist.*/,            // "/wishlist" and "/wishlist/*"
    /^\/(en|de|es|fr|hi)\/wishlist.*/,  // "/:locale/wishlist" and "/:locale/wishlist/*"
  ]

  const shouldHideNavbar = hideNavbarPatterns.some((pattern) => pattern.test(pathname))
  if (shouldHideNavbar) return null
  return (
    <>
      <JoystickNavigation selectedNav={selectedNav} onNavClick={handleNavClick} />
      <OptionsModal open={optionsOpen} onClose={() => setOptionsOpen(false)} />
    </>
  )
}

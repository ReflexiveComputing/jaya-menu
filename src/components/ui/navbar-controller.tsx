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
    /^\/$/,           // "/"
    /^\/de$/,         // "/de"
    /^\/surprise.*/,  // "/surprise*"
    /^\/de\/surprise.*/,  // "/de/surprise*"
    /^\/item.*/,            // "/item" and "/item/*"
    /^\/de\/item.*/,        // "/de/item" and "/de/item/*"
    /^\/wishlist.*/,        // "/wishlist" and "/wishlist/*"
    /^\/de\/wishlist.*/,
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

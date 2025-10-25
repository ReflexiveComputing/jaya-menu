"use client"

import React from "react"
import { usePathname } from "next/navigation"


interface NavbarContext {
    selectedNav: string
    setSelectedNav: (s: string) => void
    optionsOpen: boolean
    setOptionsOpen: (b: boolean) => void
    handleNavClick: (nav: string) => void
}
const NavbarContext = React.createContext<NavbarContext | undefined>(undefined)

export const NavbarProvider = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname()
    const [selectedNav, setSelectedNav] = React.useState<string>("")
    const [optionsOpen, setOptionsOpen] = React.useState(false)

      React.useEffect(() => {
    const toKey = (path = "") => {
      if (/(^|\/)food(\/|$)/.test(path)) return "food"
      if (/(^|\/)drinks(\/|$)/.test(path)) return "drinks"
      if (/(^|\/)wishlist(\/|$)/.test(path)) return "favorites"
      if (/(^|\/)options(\/|$)/.test(path)) return "options"
      return ""
    }
    const key = toKey(pathname)
    setSelectedNav(key)
    setOptionsOpen(key === "options")
  }, [pathname])

    const handleNavClick = (nav: string) => {
        setSelectedNav(nav)
        setOptionsOpen(nav === "options")
    }

    const value = {
        selectedNav,
        setSelectedNav,
        optionsOpen,
        setOptionsOpen,
        handleNavClick
    }

    return (
        <NavbarContext.Provider value={value}>
            {children}
        </NavbarContext.Provider>
    )
}

export function useNavbar() {
    const ctx = React.useContext(NavbarContext)
    if (!ctx) throw new Error("useNavbar must be used within NavbarProvider")
    return ctx
}
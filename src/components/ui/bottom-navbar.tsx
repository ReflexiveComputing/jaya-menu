import React from "react"
import { Utensils, Package, Heart, Settings2 } from "lucide-react"
import Link from "next/link"

interface BottomNavbarProps {
  selectedNav: string
  onNavClick: (nav: string) => void
}

export function BottomNavbar({ selectedNav, onNavClick }: BottomNavbarProps) {
  const [showBottomNav, setShowBottomNav] = React.useState(true)
  const lastScrollY = React.useRef(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < lastScrollY.current) {
        setShowBottomNav(true) // scrolling up
      } else if (currentScrollY > lastScrollY.current) {
        setShowBottomNav(false) // scrolling down
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4  transition-transform duration-300 ${showBottomNav ? "translate-y-0" : "translate-y-full"
        }`}
    >
      <div className="flex justify-around items-center">
        <button
          className={`flex flex-col items-center gap-1 py-2 ${selectedNav === "menu" ? "text-teal-600" : "text-gray-600"
            }`}
          onClick={() => onNavClick("menu")}
        >
          <Link href="/menu" className="flex flex-col items-center gap-1">
            <Utensils className="m-auto w-6 h-6" />
            <span className="text-xs font-medium">Menu</span>
          </Link>
        </button>

        <button
          className={`flex flex-col items-center gap-1 py-2 ${selectedNav === "combos" ? "text-teal-600" : "text-gray-600"
            }`}
          onClick={() => onNavClick("combos")}
        >
          <Link href="/combos" className="flex flex-col items-center gap-1">
            <Package className="m-auto w-6 h-6" />
            <span className="text-xs font-medium">Combos</span>
          </Link>
        </button>

        <button
          className={`flex flex-col items-center gap-1 py-2 ${selectedNav === "favorites" ? "text-teal-600" : "text-gray-600"
            }`}
          onClick={() => onNavClick("favorites")}
        >
          <Link href="/wishlist">
            <Heart className="m-auto w-6 h-6" />
            <span className="text-xs font-medium">Favorites</span>
          </Link>
        </button>

        <button
          className={`flex flex-col items-center gap-1 py-2 text-gray-600`}
          onClick={() => onNavClick("options")}
        >
          <Settings2 className="m-auto w-6 h-6" />
          <span className="text-xs font-medium">Options</span>
        </button>
      </div>
    </div>
  )
}

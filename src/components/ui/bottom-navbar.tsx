import React from "react"
import { Utensils, Package, Heart } from "lucide-react"

export function BottomNavbar() {
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
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 transition-transform duration-300 ${
        showBottomNav ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex justify-around items-center">
        <button className="flex flex-col items-center gap-1 py-2">
          <Utensils className="w-6 h-6 text-teal-600 fill-teal-600" />
          <span className="text-xs text-teal-600 font-medium">Menu</span>
        </button>

        <button className="flex flex-col items-center gap-1 py-2">
          <Package className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-600">Combos</span>
        </button>

        <button className="flex flex-col items-center gap-1 py-2">
          <Heart className="w-6 h-6 text-gray-600" />
          <span className="text-xs text-gray-600">Favorites</span>
        </button>
      </div>
    </div>
  )
}

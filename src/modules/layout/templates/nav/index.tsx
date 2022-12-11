import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import MobileMenu from "@modules/mobile-menu/templates"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import clsx from "clsx"
import Link from "next/link"
import Image from 'next/image'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { translations } from "@lib/i18n"

const Nav = () => {
  const i = translations()

  const { pathname } = useRouter()
  const [isHome, setIsHome] = useState(false)

  return (
    <div data-collapse="none" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease"
      role="banner" className="navigation w-nav">
      <div className="navigation-items"><a href="/" aria-current="page" className="logo-link w-nav-brand w--current"><Image
        src="/logo.svg" width={150} height={150} alt="" className="logo-image" /></a>
        <div className="navigation-wrap">
          <nav role="navigation" className="navigation-items w-nav-menu">
            <a href="/account" aria-current="page"
              className="navigation-item w-nav-link w--current">{i.nav.account}</a>
            <a href="/cart" aria-current="page"
              className="navigation-item w-nav-link w--current">{i.nav.cart}</a>
          </nav>
          <div className="menu-button w-nav-button"><Image
            src="/burger.png"
            width={22} height={22} alt="" className="menu-icon" /></div>
        </div>
      </div>
    </div>
  )
}

export default Nav

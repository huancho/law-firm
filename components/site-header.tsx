"use client"

import { useEffect, useState } from "react"

import { MobileMenu } from "@/components/mobile-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import { buttonVariants } from "@/components/ui/button"
import { firm, navigation } from "@/lib/firm"
import { cn } from "@/lib/utils"

// Matches md:h-20, so the header only hides once it has cleared its own height.
const headerHeight = 80
// Ignore trackpad jitter so the header doesn't flicker on tiny movements.
const scrollThreshold = 4

type HeaderState = "top" | "shown" | "hidden"

function useHeaderState() {
  const [state, setState] = useState<HeaderState>("top")

  useEffect(() => {
    let lastY = window.scrollY
    // A reload restores the scroll position, so the header may start mid-page.
    let frame = requestAnimationFrame(() => {
      frame = 0
      if (lastY > 0) setState("shown")
    })

    function update() {
      frame = 0
      const y = window.scrollY
      if (y <= 0) {
        setState("top")
      } else if (Math.abs(y - lastY) < scrollThreshold) {
        return
      } else {
        setState(y > lastY && y > headerHeight ? "hidden" : "shown")
      }
      lastY = y
    }

    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  return [state, setState] as const
}

function SiteHeader() {
  const [state, setState] = useHeaderState()

  // Enters on a slow-settling ease-out; leaves faster with ease-in, since the
  // reader is already looking at the page. Tabbing into a hidden header brings
  // it back so keyboard focus is never off-screen.
  return (
    <header
      data-scrolled={state !== "top" || undefined}
      data-hidden={state === "hidden" || undefined}
      onFocus={() => setState((s) => (s === "hidden" ? "shown" : s))}
      className="fixed inset-x-0 top-0 z-10 border-b-hairline border-transparent pt-[env(safe-area-inset-top,0px)] text-stone-50 transition-[translate,background-color,border-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-hidden:-translate-y-full data-hidden:duration-200 data-hidden:ease-in data-scrolled:border-stone-50/10 data-scrolled:bg-navy-950 motion-reduce:transition-none"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-gutter md:h-20">
        <a
          href="#"
          className="relative font-heading text-2xl tracking-tight before:absolute before:-inset-x-2 before:-inset-y-1.5"
        >
          {firm.name}
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-small">
            {navigation.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="link-underline text-stone-200 transition-colors before:absolute before:-inset-x-3 before:-inset-y-3 hover:text-stone-50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Phones get the consultation button inside the menu instead; the
            logo, button and menu trigger don't fit one row at 375px. */}
        <div className="-mr-2 flex items-center gap-3 md:mr-0">
          <ThemeToggle />
          <a
            href="#contact"
            className={cn(
              buttonVariants(),
              "relative hidden h-10 bg-stone-50 px-4 text-navy-950 before:absolute before:-inset-1 hover:bg-stone-200 focus-visible:border-stone-50 focus-visible:ring-stone-50/30 sm:inline-flex dark:bg-stone-50 dark:text-navy-950 dark:hover:bg-stone-200"
            )}
          >
            Book a consultation
          </a>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}

export { SiteHeader }

"use client"

import { useEffect, useRef, useState } from "react"

import { MobileMenu } from "@/components/mobile-menu"
import { buttonVariants } from "@/components/ui/button"
import { firm, navigation } from "@/lib/firm"
import { cn } from "@/lib/utils"

// Matches md:h-20, so the header only hides once it has cleared its own height.
const headerHeight = 80
// Ignore trackpad jitter so the header doesn't flicker on tiny movements.
const scrollThreshold = 4

type HeaderState = "top" | "shown" | "hidden"
type Tone = "dark" | "light"

// The bar takes the tone of whatever sits under its vertical middle. Navy
// surfaces opt in with data-header-tone="dark"; everything else is light.
function toneUnder(header: HTMLElement): Tone {
  const middle = header.offsetHeight / 2
  for (const el of document.querySelectorAll("[data-header-tone='dark']")) {
    const { top, bottom } = el.getBoundingClientRect()
    if (top <= middle && bottom > middle) return "dark"
  }
  return "light"
}

function useHeaderState(header: React.RefObject<HTMLElement | null>) {
  const [state, setState] = useState<HeaderState>("top")
  // The page opens on the navy hero.
  const [tone, setTone] = useState<Tone>("dark")

  useEffect(() => {
    let lastY = window.scrollY

    function updateTone() {
      if (header.current) setTone(toneUnder(header.current))
    }

    // A reload restores the scroll position, so the header may start mid-page.
    let frame = requestAnimationFrame(() => {
      frame = 0
      updateTone()
      if (lastY > 0) setState("shown")
    })

    function update() {
      frame = 0
      updateTone()
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

    function schedule() {
      if (!frame) frame = requestAnimationFrame(update)
    }

    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      cancelAnimationFrame(frame)
    }
  }, [header])

  return { state, setState, tone }
}

function SiteHeader() {
  const ref = useRef<HTMLElement>(null)
  const { state, setState, tone } = useHeaderState(ref)

  // Scrolled, the bar turns to frosted glass in the tone of the section
  // beneath it: smoked navy with white type over the hero and footer, stone
  // with navy type over the light sections, so the text always has contrast.
  // Enters on a slow-settling ease-out; leaves faster with ease-in, since the
  // reader is already looking at the page. Tabbing into a hidden header brings
  // it back so keyboard focus is never off-screen.
  return (
    <header
      ref={ref}
      data-scrolled={state !== "top" || undefined}
      data-hidden={state === "hidden" || undefined}
      data-tone={tone}
      onFocus={() => setState((s) => (s === "hidden" ? "shown" : s))}
      className="group fixed inset-x-0 top-0 z-10 border-b-hairline border-transparent pt-[env(safe-area-inset-top,0px)] text-stone-50 transition-[translate,background-color,border-color,color,box-shadow,backdrop-filter] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-hidden:-translate-y-full data-hidden:duration-200 data-hidden:ease-in data-scrolled:backdrop-blur-xl data-scrolled:backdrop-saturate-150 data-scrolled:data-[tone=dark]:border-stone-50/10 data-scrolled:data-[tone=dark]:bg-navy-950/72 data-[tone=light]:text-navy-950 data-scrolled:data-[tone=light]:border-navy-950/8 data-scrolled:data-[tone=light]:bg-stone-50/78 data-scrolled:data-[tone=light]:shadow-[0_8px_24px_-12px_rgb(12_22_37/0.16)] motion-reduce:transition-none"
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
                  className="link-underline text-stone-200 transition-colors group-data-[tone=light]:text-navy-800 before:absolute before:-inset-x-3 before:-inset-y-3 hover:text-stone-50 group-data-[tone=light]:hover:text-navy-950"
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
          <a
            href="#contact"
            className={cn(
              buttonVariants(),
              "relative hidden h-10 bg-stone-50 px-4 text-navy-950 before:absolute before:-inset-1 hover:bg-stone-200 focus-visible:border-stone-50 focus-visible:ring-stone-50/30 sm:inline-flex",
              "group-data-[tone=light]:bg-navy-950 group-data-[tone=light]:text-stone-50 group-data-[tone=light]:hover:bg-navy-800 group-data-[tone=light]:focus-visible:border-navy-950 group-data-[tone=light]:focus-visible:ring-navy-950/30"
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

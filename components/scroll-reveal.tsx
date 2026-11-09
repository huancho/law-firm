"use client"

import { useEffect } from "react"

// Marks [data-reveal] elements as they scroll into view, which plays their
// entrance in globals.css. Elements that arrive together are staggered in
// document order, so a row of cards settles left to right while a single
// card on a phone rises in without waiting.
function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        let index = 0
        for (const entry of entries) {
          const el = entry.target as HTMLElement
          if (entry.isIntersecting) {
            el.style.setProperty("--reveal-index", String(index++))
            el.dataset.revealed = ""
          } else if (entry.boundingClientRect.bottom < 0) {
            // Already scrolled past, as on a reload partway down the page.
            el.dataset.revealed = "instant"
          } else {
            continue
          }
          observer.unobserve(el)
        }
      },
      // Wait until the element is a little way up the screen, so the motion
      // happens where the reader is looking, not at the bottom edge.
      { rootMargin: "0px 0px -12% 0px" }
    )

    for (const el of document.querySelectorAll("[data-reveal]")) {
      observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return null
}

export { ScrollReveal }

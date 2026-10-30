"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { iconButton } from "@/components/mobile-menu"

// The theme isn't known on the server, so both states render and the `dark`
// class picks one. That keeps the icon and label right on first paint without
// a hydration mismatch.
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-keyshortcuts="d"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={iconButton}
    >
      <MoonIcon className="size-6 dark:hidden" strokeWidth={1.5} />
      <SunIcon className="hidden size-6 dark:block" strokeWidth={1.5} />
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
    </button>
  )
}

export { ThemeToggle }

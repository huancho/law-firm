"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

// The theme isn't known on the server, so both states render and the `dark`
// class picks one. That keeps the icon and label right on first paint without
// a hydration mismatch.
function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost-inverse"
      size="icon"
      aria-keyshortcuts="d"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="relative size-10 before:absolute before:-inset-1"
    >
      <MoonIcon className="size-6 dark:hidden" strokeWidth={1.5} />
      <SunIcon className="hidden size-6 dark:block" strokeWidth={1.5} />
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
    </Button>
  )
}

export { ThemeToggle }

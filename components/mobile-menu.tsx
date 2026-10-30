"use client"

import { Drawer } from "@base-ui/react/drawer"
import { MenuIcon, XIcon } from "lucide-react"
import { useRef, useState } from "react"

import { buttonVariants } from "@/components/ui/button"
import { firm, navigation } from "@/lib/firm"
import { cn } from "@/lib/utils"

const ease = "ease-[cubic-bezier(0.32,0.72,0,1)]"

const iconButton =
  "relative inline-flex size-10 items-center justify-center rounded-lg text-stone-50 transition-[background-color,scale] duration-150 before:absolute before:-inset-1 hover:bg-stone-50/10 active:scale-[0.94] active:bg-stone-50/10"

// Links rise in one after another as the panel settles, and all leave at once.
const stagger =
  "transition-[opacity,translate] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] delay-(--delay) group-data-ending-style:opacity-0 group-data-ending-style:delay-0 group-data-ending-style:duration-150 group-data-starting-style:translate-x-6 group-data-starting-style:opacity-0 motion-reduce:transition-none"

function MobileMenu() {
  const [open, setOpen] = useState(false)
  const target = useRef<string | null>(null)

  // The scroll lock restores the old position when it releases, so an anchor
  // followed while the drawer is open would snap back. Close first, then scroll.
  function navigate(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    target.current = event.currentTarget.hash
    setOpen(false)
  }

  function onOpenChangeComplete(isOpen: boolean) {
    if (isOpen || !target.current) return
    document.querySelector(target.current)?.scrollIntoView()
    target.current = null
  }

  return (
    <Drawer.Root
      swipeDirection="right"
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={onOpenChangeComplete}
    >
      <Drawer.Trigger aria-label="Open menu" className={iconButton}>
        <MenuIcon className="size-6" strokeWidth={1.5} />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop
          className={cn(
            "fixed inset-0 z-20 min-h-dvh bg-navy-950/60 opacity-[calc(1-var(--drawer-swipe-progress))] backdrop-blur-[2px] transition-opacity duration-450 data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:opacity-0 data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute",
            ease
          )}
        />
        <Drawer.Viewport className="fixed inset-0 z-20 flex justify-end">
          <Drawer.Popup
            className={cn(
              "group flex h-full w-[calc(100vw-3rem)] max-w-sm translate-x-(--drawer-swipe-movement-x) flex-col overflow-y-auto overscroll-contain border-l-hairline border-stone-50/10 bg-navy-950 text-stone-50 shadow-2xl transition-transform duration-450 outline-none data-ending-style:translate-x-full data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:translate-x-full data-swiping:select-none",
              "pt-[env(safe-area-inset-top,0px)] pr-[env(safe-area-inset-right,0px)] pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))]",
              ease
            )}
          >
            <Drawer.Content className="flex flex-1 flex-col">
              <div className="flex h-16 items-center justify-between pr-4 pl-6">
                <Drawer.Title className="text-eyebrow text-brass-200 uppercase">
                  Menu
                </Drawer.Title>
                <Drawer.Close aria-label="Close menu" className={iconButton}>
                  <XIcon className="size-6" strokeWidth={1.5} />
                </Drawer.Close>
              </div>
              <nav aria-label="Mobile" className="px-6 pt-6">
                <ul className="border-t-hairline border-stone-50/10">
                  {navigation.map((link, i) => (
                    <li
                      key={link.href}
                      style={
                        {
                          "--delay": `${100 + i * 50}ms`,
                        } as React.CSSProperties
                      }
                      className={cn(
                        "border-b-hairline border-stone-50/10",
                        stagger
                      )}
                    >
                      <a
                        href={link.href}
                        onClick={navigate}
                        className="flex items-baseline gap-4 py-4 font-heading text-[2rem] leading-tight tracking-tight transition-colors active:text-brass-200"
                      >
                        <span className="font-sans text-small text-stone-400 tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div
                style={{ "--delay": "350ms" } as React.CSSProperties}
                className={cn(
                  "mt-auto flex flex-col gap-5 px-6 pt-12",
                  stagger
                )}
              >
                <a
                  href="#contact"
                  onClick={navigate}
                  className={cn(
                    buttonVariants(),
                    "h-12 w-full bg-stone-50 text-base text-navy-950 hover:bg-stone-200 active:bg-stone-200 dark:bg-stone-50 dark:text-navy-950 dark:hover:bg-stone-200"
                  )}
                >
                  Book a consultation
                </a>
                <div className="flex flex-col gap-1 text-small text-stone-300">
                  <a href={firm.phoneHref} className="py-1.5 tabular-nums">
                    {firm.phone}
                  </a>
                  <a href={`mailto:${firm.email}`} className="py-1.5">
                    {firm.email}
                  </a>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export { MobileMenu }

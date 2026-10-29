import { buttonVariants } from "@/components/ui/button"
import { firm } from "@/lib/firm"
import { cn } from "@/lib/utils"

const links = [
  { href: "#about", label: "About" },
  { href: "#practice-areas", label: "Practice areas" },
  { href: "#attorneys", label: "Attorneys" },
  { href: "#contact", label: "Contact" },
]

function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 text-stone-50">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-6 px-6">
        <a
          href="#"
          className="relative font-heading text-2xl tracking-tight before:absolute before:-inset-x-2 before:-inset-y-1.5"
        >
          {firm.name}
        </a>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 text-small">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative text-stone-200 transition-colors before:absolute before:-inset-x-3 before:-inset-y-3 hover:text-stone-50"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="#contact"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "relative h-9 border-stone-50/30 bg-transparent px-3.5 text-stone-50 before:absolute before:-inset-1 hover:bg-stone-50/10 hover:text-stone-50 focus-visible:border-stone-50/60 focus-visible:ring-stone-50/30 dark:bg-transparent"
          )}
        >
          Book a consultation
        </a>
      </div>
    </header>
  )
}

export { SiteHeader }

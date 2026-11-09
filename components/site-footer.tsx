import { ArrowUpIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/typography"
import { firm, navigation, practiceAreas } from "@/lib/firm"
import { cn } from "@/lib/utils"

// Enlarged hit area on ::before; link-underline draws on ::after.
const hit = "before:absolute before:-inset-x-2 before:-inset-y-1.5"

const footerLink = cn(
  "link-underline text-navy-100 transition-colors hover:text-stone-50",
  hit
)

const label = "text-brass-200"

// A navy sheet inset from the page edges, on the same stone as the contact
// section above it. The brand sits on the left and the three directory
// columns are pushed to the right edge, so the two groups read apart.
function SiteFooter() {
  return (
    <footer className="bg-stone-100 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div
        data-header-tone="dark"
        className="relative isolate overflow-hidden rounded-2xl bg-navy-800 text-stone-50 shadow-[inset_0_1px_0_color-mix(in_oklch,var(--color-stone-50)_12%,transparent),inset_0_0_0_1px_color-mix(in_oklch,var(--color-stone-50)_6%,transparent)]"
      >
        {/* A darker pool behind the brand so the sheet has depth. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_80%_at_0%_0%,var(--color-navy-900),transparent)]"
        />
        <div className="mx-auto flex max-w-6xl flex-col gap-12 pt-16 px-gutter pb-8 md:pt-20">
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
            <div className="flex flex-col items-start gap-6">
              <a
                href="#"
                className={cn(
                  "relative font-heading text-[2.5rem] leading-none tracking-tight",
                  hit
                )}
              >
                {firm.name}
              </a>
              <p className="max-w-[32ch] text-body text-pretty text-navy-100">
                A Boston firm for people, families and small companies, since{" "}
                {firm.founded}.
              </p>
              <a
                href="#contact"
                className={cn(
                  buttonVariants(),
                  "mt-2 h-11 bg-stone-50 px-5 text-body text-navy-950 hover:bg-stone-200 focus-visible:border-stone-50 focus-visible:ring-stone-50/30"
                )}
              >
                Book a consultation
              </a>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:flex lg:gap-16 xl:gap-20">
              <nav aria-label="Footer" className="flex flex-col gap-4">
                <Eyebrow className={label}>Firm</Eyebrow>
                <ul className="flex flex-col items-start gap-3 text-small">
                  {navigation.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className={footerLink}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex flex-col gap-4">
                <Eyebrow className={label}>Practice areas</Eyebrow>
                <ul className="flex flex-col items-start gap-3 text-small">
                  {practiceAreas.map((area) => (
                    <li key={area.name}>
                      <a href="#practice-areas" className={footerLink}>
                        {area.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-2 flex flex-col gap-4 sm:col-span-1">
                <Eyebrow className={label}>Office</Eyebrow>
                <address className="flex flex-col items-start gap-3 text-small text-navy-100 not-italic">
                  <span>
                    {firm.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                  <a
                    href={firm.phoneHref}
                    className={cn(footerLink, "tabular-nums")}
                  >
                    {firm.phone}
                  </a>
                  <a href={`mailto:${firm.email}`} className={footerLink}>
                    {firm.email}
                  </a>
                  <span className="text-navy-200">{firm.hours.join(", ")}</span>
                </address>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-4 border-t-hairline border-stone-50/15 pt-6 text-small text-navy-200 md:flex-row md:items-center md:justify-between md:gap-12">
            <p>Attorney advertising. Nothing on this site is legal advice.</p>
            <div className="flex shrink-0 items-center justify-between gap-8">
              <span>
                © {new Date().getFullYear()} {firm.legalName}
              </span>
              <a
                href="#"
                className={cn(
                  "group relative inline-flex items-center gap-1.5 text-navy-100 transition-colors hover:text-stone-50",
                  hit
                )}
              >
                Back to top
                <ArrowUpIcon
                  aria-hidden
                  className="size-3.5 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { SiteFooter }

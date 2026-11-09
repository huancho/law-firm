import { ArrowRightIcon } from "lucide-react"

import { PracticeAreaLink } from "@/components/practice-area-link"
import { Eyebrow, H2, P } from "@/components/ui/typography"
import { firm, practiceAreas } from "@/lib/firm"

const cardHeading = "font-heading text-[1.5rem] leading-tight text-balance"

// Every area is on screen at once, nothing to open. The navy sixth card
// catches the visitor who can't tell which area their problem falls under.
function PracticeAreas() {
  return (
    <section id="practice-areas" className="bg-stone-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 py-24 px-gutter md:gap-14 md:py-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex max-w-2xl flex-col gap-4">
            <Eyebrow>Practice areas</Eyebrow>
            <H2>We specialize in five areas of law</H2>
          </div>
          <P className="max-w-sm text-muted-foreground">
            Focusing on a few areas means the attorney on your case handles
            matters like yours every week.
          </P>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {practiceAreas.map((area, i) => (
            <li
              key={area.name}
              className="flex flex-col rounded-xl bg-card p-6 shadow-raised sm:p-7"
            >
              {/* Numbers stay neutral, so the brass disc on the link is the
                  only warm note in the card and the eye lands there. */}
              <span className="flex items-center gap-3 text-small font-medium text-muted-foreground tabular-nums">
                {String(i + 1).padStart(2, "0")}
                <span aria-hidden className="h-px w-6 bg-foreground/15" />
              </span>
              <h3 className={`${cardHeading} mt-5`}>{area.name}</h3>
              <p className="mt-3 text-small text-pretty text-muted-foreground">
                {area.description}
              </p>
              <div className="mt-auto pt-7">
                <PracticeAreaLink
                  area={area.name}
                  className="group relative inline-flex w-fit items-center gap-2.5 text-small font-medium text-foreground before:absolute before:inset-x-0 before:-inset-y-2"
                >
                  <span className="underline decoration-transparent underline-offset-[0.25em] transition-colors group-hover:decoration-foreground/40">
                    Ask about {area.name.toLowerCase()}
                  </span>
                  <span
                    aria-hidden
                    className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brass-100 text-brass-800 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                  >
                    <ArrowRightIcon className="size-3.5" />
                  </span>
                </PracticeAreaLink>
              </div>
            </li>
          ))}

          {/* Kept shorter than the area cards (one-line heading, links on one
              row), so the area cards set the row height, not this one. */}
          <li className="flex flex-col rounded-xl bg-navy-950 p-6 text-stone-50 sm:p-7">
            <span className="flex items-center gap-3 text-small font-medium text-stone-400">
              Not sure?
              <span aria-hidden className="h-px w-6 bg-stone-50/20" />
            </span>
            <h3 className={`${cardHeading} mt-5`}>Start with a phone call</h3>
            <p className="mt-3 text-small text-pretty text-stone-300">
              Tell us what’s going on and we’ll tell you who should handle it,
              or whether you need a lawyer at all.
            </p>
            <div className="mt-auto flex flex-wrap items-baseline gap-x-5 gap-y-3 pt-7">
              <a
                href={firm.phoneHref}
                className="relative font-heading text-xl tabular-nums underline decoration-stone-50/30 underline-offset-[0.25em] transition-colors before:absolute before:-inset-y-2 hover:decoration-stone-50"
              >
                {firm.phone}
              </a>
              <a
                href="#contact"
                className="relative text-small text-stone-300 underline decoration-stone-50/30 underline-offset-[0.25em] transition-colors before:absolute before:-inset-y-2.5 hover:text-stone-50 hover:decoration-stone-50"
              >
                Or write to us
              </a>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}

export { PracticeAreas }

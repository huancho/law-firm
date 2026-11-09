import Image from "next/image"

import { AttorneyRoster } from "@/components/attorney-roster"
import { ContactForm } from "@/components/contact-form"
import { PracticeAreas } from "@/components/practice-areas"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { buttonVariants } from "@/components/ui/button"
import { Eyebrow, H1, H2, Lead, P, Small } from "@/components/ui/typography"
import { attorneys, firm } from "@/lib/firm"
import { cn } from "@/lib/utils"

import building from "@/assets/images/building.webp"
import office from "@/assets/images/office.webp"

// rounded-[inherit] keeps the outline following the wrapper's corners instead
// of being clipped off them.
const imageOutline =
  "rounded-[inherit] outline outline-1 -outline-offset-1 outline-black/10"

const introScript = `try{var s=document.currentScript.parentElement;if(sessionStorage.getItem("intro-seen"))s.dataset.introSeen="";else sessionStorage.setItem("intro-seen","1")}catch(e){}`

const contactLink =
  "relative underline decoration-foreground/25 underline-offset-[0.25em] transition-colors before:absolute before:-inset-y-2 hover:decoration-foreground"

// The second sheet behind the contact form.
const sheet = "absolute inset-0 rounded-lg bg-stone-50 shadow-raised"

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <PracticeAreas />
        <Attorneys />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}

// Light from a tall window off-frame top right: each shaft is a slanted quad,
// in percent of the hero (left and right edge at the top, then at the bottom).
// The gaps between them are the window's mullions.
const lightShafts = [
  { top: [69, 77], bottom: [44, 57] },
  { top: [79, 87], bottom: [59, 72] },
  { top: [89, 96], bottom: [74, 86] },
]

function Hero() {
  const founders = attorneys.filter((a) => a.role === "Founding Partner")

  return (
    <section
      suppressHydrationWarning
      data-header-tone="dark"
      className="hero-intro relative isolate overflow-hidden bg-navy-950 text-stone-50"
    >
      {/* Runs before the hero paints, so repeat views in a session skip the entrance. */}
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      {/* A soft light behind the portraits, so they sit in a room rather than
          on a flat navy sheet. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_80%_45%,var(--color-navy-900),transparent)]"
      />
      {/* Warm window light falling across the portraits. The blur sits on the
          wrapper and the clip on each shaft, so the edges soften like real
          light. On phones the shafts start halfway down, behind the
          portraits, and fade in so they never cross the copy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 blur-md max-md:top-1/2 max-md:mask-[linear-gradient(to_bottom,transparent,black_35%)]"
      >
        {lightShafts.map(({ top, bottom }, i) => (
          <div
            key={i}
            className="hero-sweep absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_oklch,var(--color-brass-200)_16%,transparent),color-mix(in_oklch,var(--color-brass-200)_7%,transparent)_55%,color-mix(in_oklch,var(--color-brass-200)_2%,transparent))]"
            style={
              {
                "--delay": `${200 + i * 140}ms`,
                clipPath: `polygon(${top[0]}% 0, ${top[1]}% 0, ${bottom[1]}% 100%, ${bottom[0]}% 100%)`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      {/* Where the light lands on the floor. */}
      <div
        aria-hidden
        className="hero-sweep pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-[radial-gradient(ellipse_35%_60%_at_66%_100%,color-mix(in_oklch,var(--color-brass-400)_14%,transparent),transparent)] [--delay:600ms]"
      />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-x-8 gap-y-16 pt-32 px-gutter pb-20 md:min-h-[min(50rem,92svh)] md:grid-cols-12 md:pt-36 md:pb-24">
        <div className="flex flex-col gap-6 md:col-span-7">
          <Eyebrow className="hero-rise text-brass-200 [--delay:150ms]">
            Practicing in Boston since {firm.founded}
          </Eyebrow>
          <H1 className="hero-rise [--delay:250ms]">
            Lawyers who tell you where you stand
          </H1>
          <Lead className="hero-rise max-w-[34rem] text-stone-300 [--delay:400ms]">
            We work for people, families and small companies. You’ll get a
            straight estimate of what your case will cost, and a lawyer who
            actually calls you back.
          </Lead>
          {/* The note sits right under the button, where the decision to
              click is made. */}
          <div className="mt-2 flex flex-col gap-4">
            <div className="hero-rise flex flex-wrap items-center gap-x-6 gap-y-4 [--delay:550ms]">
              <a
                href="#contact"
                className={cn(
                  buttonVariants(),
                  "h-12 bg-stone-50 px-6 text-base text-navy-950 hover:bg-stone-200 focus-visible:border-stone-50 focus-visible:ring-stone-50/30"
                )}
              >
                Book a consultation
              </a>
              <a
                href={firm.phoneHref}
                className="relative text-base text-stone-200 tabular-nums underline decoration-stone-50/30 underline-offset-[0.3em] transition-colors before:absolute before:-inset-y-2.5 hover:text-stone-50 hover:decoration-stone-50"
              >
                Or call {firm.phone}
              </a>
            </div>
            <Small className="hero-rise text-stone-400 [--delay:650ms]">
              Your first consultation is free and confidential.
            </Small>
          </div>
        </div>
        <div className="relative max-w-md md:col-span-5 md:max-w-none">
          {/* The second portrait drops half a step, so the pair reads as two
              people standing together rather than a grid of headshots. */}
          <ul className="grid grid-cols-2 gap-4 md:gap-5">
            {founders.map((founder, i) => (
              <li
                key={founder.name}
                className={cn(
                  "hero-rise flex flex-col gap-3",
                  i === 0 ? "[--delay:450ms]" : "mt-10 [--delay:600ms] md:mt-16"
                )}
              >
                <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-navy-900">
                  <Image
                    src={founder.image}
                    alt={`Portrait of ${founder.name}`}
                    fill
                    sizes="(min-width: 1152px) 220px, (min-width: 768px) 20vw, 50vw"
                    loading="eager"
                    fetchPriority="high"
                    className="rounded-[inherit] object-cover object-[50%_20%] outline outline-1 -outline-offset-1 outline-white/10"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-lg">{founder.name}</span>
                  <span className="text-small text-stone-400">
                    Founding partner
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

function About() {
  // Short numerals only, so the three columns still fit side by side at 375px.
  const facts = [
    { label: "Founded", value: String(firm.founded) },
    { label: "Attorneys", value: "14" },
    { label: "Offices", value: "2" },
  ]

  return (
    <section id="about" className="mx-auto max-w-6xl py-24 px-gutter md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
        {/* The building, with the office inside it as an inset. Landscape on
            phones so the photo doesn't push the copy below the fold. */}
        <figure className="flex flex-col md:col-span-5">
          <div className="relative">
            <div className="relative aspect-3/2 overflow-hidden rounded-lg bg-muted md:aspect-4/5">
              <Image
                src={building}
                alt="Looking up at glass office towers against a cloudy sky"
                fill
                placeholder="blur"
                sizes="(min-width: 1152px) 440px, (min-width: 768px) 40vw, 100vw"
                // The top third is sky; anchor low so the towers fill the frame.
                className={cn(
                  "object-cover object-[50%_80%] md:object-[50%_70%]",
                  imageOutline
                )}
              />
            </div>
            {/* The inset overhangs the bottom edge, so the caption is held to
                the width left of it. */}
            <div className="absolute right-4 -bottom-10 aspect-square w-[38%] overflow-hidden rounded-md bg-muted ring-6 ring-background md:-right-6 md:-bottom-12 md:w-[46%]">
              <Image
                src={office}
                alt="A corridor of glass-walled offices with black steel frames, past a lounge with a sofa and a floor lamp"
                fill
                placeholder="blur"
                sizes="(min-width: 768px) 200px, 40vw"
                className={cn("object-cover", imageOutline)}
              />
            </div>
          </div>
          <figcaption className="mt-4 max-w-[52%] text-small text-pretty text-muted-foreground md:max-w-[48%]">
            Our office at 210 Federal Street, in the Financial District, since
            2004.
          </figcaption>
        </figure>
        <div className="flex flex-col gap-8 md:col-span-7">
          <div className="flex flex-col gap-4">
            <Eyebrow>About the firm</Eyebrow>
            <H2>We’ve kept it small on purpose</H2>
          </div>
          {/* Paragraph spacing of one line-height keeps the vertical rhythm. */}
          <div className="flex flex-col gap-[1lh] text-body">
            <P className="text-muted-foreground">
              Daniel Calder and Elena Wren opened the firm in {firm.founded}{" "}
              after years of watching clients at big firms ask who was actually
              working on their case. They still read every new matter that comes
              in.
            </P>
            <P className="text-muted-foreground">
              We take on fewer cases than we could. Each client gets one lead
              attorney who knows the file and will tell you when going to court
              isn’t worth the money.
            </P>
          </div>
          <dl className="grid max-w-prose grid-cols-3 gap-6 border-t-hairline border-foreground/15 pt-6">
            {facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1">
                <dt className="text-small text-muted-foreground">
                  {fact.label}
                </dt>
                <dd className="font-heading text-h3 tabular-nums">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Attorneys() {
  return (
    <section
      id="attorneys"
      className="mx-auto max-w-6xl py-24 px-gutter md:py-32"
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="flex max-w-2xl flex-col gap-4">
          <Eyebrow>Our attorneys</Eyebrow>
          <H2>The people who will handle your matter</H2>
        </div>
        <Lead className="max-w-sm">
          You’ll have one attorney’s direct line, and it won’t change halfway
          through your case.
        </Lead>
      </div>
      <AttorneyRoster />
    </section>
  )
}

// The form sits on a sheet of the firm's stationery: a brass hairline frame
// inset from the edge, the wordmark across the top, and a second sheet tucked
// behind so it reads as a pad of letterhead rather than a widget.
function Contact() {
  return (
    <section id="contact" className="bg-stone-100">
      <div className="mx-auto grid max-w-6xl gap-14 py-24 px-gutter md:grid-cols-12 md:py-32">
        <div className="flex flex-col gap-6 md:col-span-5">
          <Eyebrow className="text-brass-700">Contact</Eyebrow>
          <H2>Tell us what’s going on</H2>
          <Lead>
            The first consultation is free and confidential. We answer every
            message within one business day.
          </Lead>
          {/* Phone and email lead as the direct alternatives to the form;
              office and hours step back to small text beneath them. */}
          <dl className="mt-4 grid gap-x-8 gap-y-6 border-t-hairline border-foreground/15 pt-6 sm:grid-cols-2">
            <div>
              <dt className="text-small text-muted-foreground">Phone</dt>
              <dd className="text-body tabular-nums">
                <a href={firm.phoneHref} className={contactLink}>
                  {firm.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-small text-muted-foreground">Email</dt>
              <dd className="text-body">
                <a href={`mailto:${firm.email}`} className={contactLink}>
                  {firm.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-small text-muted-foreground">Office</dt>
              <dd className="text-small text-foreground/80">
                {firm.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-small text-muted-foreground">Hours</dt>
              <dd className="text-small text-foreground/80">
                {firm.hours.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>
        <div className="relative isolate self-start md:col-span-7">
          <div
            aria-hidden
            className={`${sheet} -z-10 translate-x-1.5 translate-y-2.5 rotate-[1.25deg]`}
          />
          <div className="rounded-lg bg-card p-1.5 text-card-foreground shadow-raised">
            <div className="rounded-[4px] p-5 ring-1 ring-brass-300/45 ring-inset sm:p-7">
              <header className="mb-7 flex items-center justify-between gap-4 border-b-hairline border-foreground/10 pb-5">
                {/* The wordmark as it's set in the site header. */}
                <span className="font-heading text-2xl tracking-tight">
                  {firm.name}
                </span>
                <span className="hidden text-eyebrow text-brass-700 uppercase sm:block">
                  Established {firm.founded}
                </span>
              </header>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

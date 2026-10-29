import type { Metadata } from "next"
import Image from "next/image"

import { ContactForm } from "@/components/contact-form"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { buttonVariants } from "@/components/ui/button"
import { Eyebrow, H1, H2, H3, Lead, P, Small } from "@/components/ui/typography"
import { attorneys, firm, practiceAreas } from "@/lib/firm"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: `${firm.legalName} · Boston law firm`,
  description:
    "A Boston law firm handling business, litigation, family, real estate and estate planning matters since 1998.",
}

// rounded-[inherit] keeps the outline following the wrapper's corners instead
// of being clipped off them.
const imageOutline =
  "rounded-[inherit] outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"

const introScript = `try{var s=document.currentScript.parentElement;if(sessionStorage.getItem("intro-seen"))s.dataset.introSeen="";else sessionStorage.setItem("intro-seen","1")}catch(e){}`

const contactLink =
  "relative underline decoration-stone-50/30 underline-offset-[0.25em] transition-colors before:absolute before:-inset-y-2 hover:decoration-stone-50"

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

function Hero() {
  return (
    <section
      suppressHydrationWarning
      className="hero-intro relative isolate flex min-h-[min(52rem,92svh)] items-end overflow-hidden bg-navy-950 text-stone-50"
    >
      {/* Runs before the hero paints, so repeat views in a session skip the entrance. */}
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <Image
        src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=2400&q=80"
        alt=""
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="hero-settle pointer-events-none -z-10 object-cover object-[70%_50%] select-none"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-navy-950 via-navy-950/80 to-navy-950/40 md:bg-linear-to-r md:from-navy-950/95 md:via-navy-950/75 md:to-navy-950/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-scrim-b"
      />
      <div className="mx-auto w-full max-w-6xl px-6 pt-36 pb-20 md:pb-28">
        <div className="flex max-w-2xl flex-col gap-6">
          <Eyebrow className="hero-rise text-brass-200 [--delay:150ms]">
            Practicing in Boston since {firm.founded}
          </Eyebrow>
          <H1 className="hero-rise [--delay:250ms]">
            Lawyers who tell you where you stand
          </H1>
          <Lead className="hero-rise text-stone-200 [--delay:400ms]">
            We work for people, families and small companies. You’ll get a
            straight estimate of what your case will cost, and a lawyer who
            actually calls you back.
          </Lead>
          <div className="hero-rise mt-2 flex flex-wrap items-center gap-x-6 gap-y-4 [--delay:550ms]">
            <a
              href="#contact"
              className={cn(
                buttonVariants(),
                "h-11 bg-stone-50 px-5 text-base text-navy-950 hover:bg-stone-200 focus-visible:border-stone-50 focus-visible:ring-stone-50/30 dark:bg-stone-50 dark:text-navy-950 dark:hover:bg-stone-200"
              )}
            >
              Book a consultation
            </a>
            <a
              href={firm.phoneHref}
              className="relative text-base text-stone-200 underline decoration-stone-50/30 underline-offset-[0.3em] transition-colors before:absolute before:-inset-y-2.5 hover:text-stone-50 hover:decoration-stone-50"
            >
              Or call {firm.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function About() {
  const facts = [
    { label: "Founded", value: String(firm.founded) },
    { label: "Attorneys", value: "14" },
    { label: "Offices", value: "Boston & Providence" },
  ]

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <div className="relative aspect-4/5 overflow-hidden rounded-lg md:col-span-5">
          <Image
            src="https://images.unsplash.com/photo-1505547828843-176834e42154?w=1600&q=80"
            alt="Stone columns beneath a coffered ceiling and skylight"
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className={cn("object-cover", imageOutline)}
          />
        </div>
        <div className="flex flex-col gap-6 md:col-span-7">
          <Eyebrow>About the firm</Eyebrow>
          <H2>We’ve kept it small on purpose</H2>
          <P className="text-muted-foreground">
            Daniel Calder and Elena Wren opened the firm in {firm.founded}
            after years of watching clients at big firms ask who was actually
            working on their case. They still read every new matter that comes
            in.
          </P>
          <P className="text-muted-foreground">
            We take on fewer cases than we could. Each client gets one lead
            attorney who knows the file and will tell you when going to court
            isn’t worth the money.
          </P>
          <dl className="mt-4 grid grid-cols-3 gap-6 border-t-hairline pt-6">
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

function PracticeAreas() {
  return (
    <section id="practice-areas" className="bg-stone-100 dark:bg-navy-900/40">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <div className="flex max-w-2xl flex-col gap-4">
          <Eyebrow>Practice areas</Eyebrow>
          <H2>Five kinds of law, and we turn down the rest</H2>
        </div>
        <ol className="mt-14 border-t-hairline border-foreground/15">
          {practiceAreas.map((area, i) => (
            <li
              key={area.name}
              className="grid gap-4 border-b-hairline border-foreground/15 py-8 md:grid-cols-12 md:gap-8"
            >
              <span className="text-small text-muted-foreground tabular-nums md:col-span-1 md:pt-1.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <H3 className="md:col-span-4">{area.name}</H3>
              <div className="flex flex-col gap-3 md:col-span-7">
                <P className="text-muted-foreground">{area.description}</P>
                <Small>{area.matters.join(" · ")}</Small>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Attorneys() {
  return (
    <section id="attorneys" className="mx-auto max-w-6xl px-6 py-24 md:py-32">
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
      <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
        {attorneys.map((attorney) => (
          <li key={attorney.name} className="flex flex-col gap-4">
            <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-muted">
              <Image
                src={attorney.image}
                alt={`Portrait of ${attorney.name}`}
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className={cn("object-cover object-[50%_20%]", imageOutline)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-heading text-xl">{attorney.name}</p>
              <Small>
                {attorney.role} · {attorney.focus}
              </Small>
              <a
                href={`mailto:${attorney.email}`}
                className="relative mt-1 w-fit text-small break-all text-foreground underline decoration-foreground/25 underline-offset-[0.25em] transition-colors before:absolute before:-inset-y-2.5 hover:decoration-foreground"
              >
                {attorney.email}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="bg-navy-950 text-stone-50">
      <div className="mx-auto grid max-w-6xl gap-14 px-6 py-24 md:grid-cols-12 md:py-32">
        <div className="flex flex-col gap-6 md:col-span-5">
          <Eyebrow className="text-brass-200">Contact</Eyebrow>
          <H2>Tell us what’s going on</H2>
          <Lead className="text-stone-300">
            The first consultation is free and confidential. We answer every
            message within one business day.
          </Lead>
          <dl className="mt-4 flex flex-col gap-5 border-t-hairline border-stone-50/15 pt-6 text-body">
            <div>
              <dt className="text-small text-stone-400">Office</dt>
              <dd>
                {firm.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </dd>
            </div>
            <div>
              <dt className="text-small text-stone-400">Phone</dt>
              <dd>
                <a href={firm.phoneHref} className={contactLink}>
                  {firm.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-small text-stone-400">Email</dt>
              <dd>
                <a href={`mailto:${firm.email}`} className={contactLink}>
                  {firm.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-small text-stone-400">Hours</dt>
              <dd>{firm.hours}</dd>
            </div>
          </dl>
        </div>
        {/* Bezel: 22px outer − 8px padding = 14px (rounded-xl) on the card. */}
        <div className="self-start rounded-3xl bg-white/5 p-2 ring-1 ring-white/10 md:col-span-7">
          <div className="rounded-xl bg-card p-6 text-card-foreground shadow-raised sm:p-8">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

import { Small } from "@/components/ui/typography"
import { attorneys } from "@/lib/firm"
import { cn } from "@/lib/utils"

const imageOutline =
  "rounded-[inherit] outline outline-1 -outline-offset-1 outline-black/10"

const attorneyLink =
  "relative w-fit underline decoration-foreground/25 underline-offset-[0.25em] transition-colors before:absolute before:-inset-x-1 before:-inset-y-1.5 hover:decoration-foreground"

// The names lead, so the founders' portraits from the hero don't repeat at
// full size. With a mouse on a wide screen, one portrait slides along an
// empty column, tracking the row under the cursor. On touch or narrow
// screens each row gets a small thumbnail instead, since there's no hover.
function AttorneyRoster() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const target = useRef(0)
  const pos = useRef(0)
  const raf = useRef(0)
  const shown = useRef(false)
  // The index outlives the hover, so the portrait fades out instead of
  // blanking first.
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  function paint() {
    const frame = frameRef.current
    if (frame) frame.style.transform = `translate3d(0, ${pos.current}px, 0)`
  }

  // Eases toward the cursor each frame, so the portrait trails the pointer
  // instead of jumping row to row.
  function tick() {
    pos.current += (target.current - pos.current) * 0.18
    paint()
    raf.current =
      Math.abs(target.current - pos.current) > 0.1
        ? requestAnimationFrame(tick)
        : 0
  }

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return
    const wrap = wrapRef.current
    const frame = frameRef.current
    if (!wrap || !frame) return
    const r = wrap.getBoundingClientRect()
    const h = frame.offsetHeight
    // Centered on the cursor, held inside the list.
    const y = e.clientY - r.top - h / 2
    target.current = Math.min(Math.max(y, 0), r.height - h)

    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches
    // First move after entering: appear in place instead of sliding in.
    if (!shown.current || reduce) {
      shown.current = true
      pos.current = target.current
      paint()
      return
    }
    if (!raf.current) raf.current = requestAnimationFrame(tick)
  }

  function onPointerLeave() {
    shown.current = false
    setVisible(false)
  }

  return (
    <div
      ref={wrapRef}
      className="relative mt-14"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <ul className="group/list">
        {attorneys.map((attorney, i) => {
          const [mailbox, domain] = attorney.email.split("@")

          return (
            <li
              key={attorney.name}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return
                setIndex(i)
                setVisible(true)
              }}
              className="flex items-start gap-4 border-t-hairline border-foreground/15 py-6 transition-opacity duration-150 ease-out group-hover/list:not-hover:opacity-45 last:border-b-hairline motion-reduce:transition-none md:py-8"
            >
              <div className="relative aspect-4/5 w-16 shrink-0 overflow-hidden rounded-md bg-muted md:[@media(hover:hover)_and_(pointer:fine)]:hidden">
                <Image
                  src={attorney.image}
                  alt=""
                  fill
                  sizes="64px"
                  className={cn("object-cover object-[50%_20%]", imageOutline)}
                />
              </div>
              {/* Columns 5–6 stay empty: that's the portrait's rail. */}
              <div className="grid flex-1 gap-x-6 gap-y-3 md:grid-cols-12 md:items-baseline">
                <h3 className="font-heading text-[clamp(1.75rem,1.45rem+1.3vw,2.5rem)] leading-[1.1] tracking-[-0.015em] md:col-span-4">
                  {attorney.name}
                </h3>
                {/* Role and focus on their own lines, so the separator is
                    never stranded at a line break. */}
                <Small className="md:col-span-3 md:col-start-7">
                  {attorney.role}
                  <span className="block">{attorney.focus}</span>
                </Small>
                {/* Hit areas stretch by half the gap, so the two links meet
                    without overlapping. */}
                <div className="flex flex-col gap-3 text-small md:col-span-3">
                  <a
                    href={attorney.phoneHref}
                    className={cn(attorneyLink, "tabular-nums")}
                  >
                    {attorney.phone}
                  </a>
                  <a href={`mailto:${attorney.email}`} className={attorneyLink}>
                    {/* Wraps before the @ when space is tight, never
                        mid-name. */}
                    {mailbox}
                    <wbr />@{domain}
                  </a>
                </div>
              </div>
            </li>
          )
        })}
      </ul>

      {/* Decorative: the names carry the content, and touch gets the
          thumbnails above. Sits over columns 5–6 of the row grid, so the
          left and width mirror its 1.5rem gaps. */}
      <div
        ref={frameRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-[calc((100%-11*1.5rem)/12*4+4*1.5rem)] z-10 hidden w-[calc((100%-11*1.5rem)/12*2+1.5rem)] will-change-transform md:[@media(hover:hover)_and_(pointer:fine)]:block"
      >
        <div
          data-visible={visible ? "" : undefined}
          className="relative aspect-4/5 scale-96 overflow-hidden rounded-lg bg-muted opacity-0 shadow-[0_1px_2px_rgb(0_0_0/0.06),0_8px_24px_-6px_rgb(0_0_0/0.18),0_24px_48px_-12px_rgb(0_0_0/0.18)] transition-[opacity,scale] duration-150 ease-in data-visible:scale-100 data-visible:opacity-100 data-visible:duration-200 data-visible:ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none"
        >
          {attorneys.map((attorney, i) => (
            <Image
              key={attorney.name}
              src={attorney.image}
              alt=""
              fill
              sizes="200px"
              className={cn(
                "object-cover object-[50%_20%]",
                imageOutline,
                i === index ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export { AttorneyRoster }

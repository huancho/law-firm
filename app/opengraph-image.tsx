import { ImageResponse } from "next/og"

import { firm } from "@/lib/firm"

import { colors, loadFonts } from "./_brand/brand"

export const alt = `${firm.legalName}, a Boston law firm. Lawyers who tell you where you stand.`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// The link preview for Slack, iMessage, LinkedIn and X. Mirrors the hero:
// navy ground, brass eyebrow, the headline in Newsreader.
export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 88px",
        background: colors.navy950,
        color: colors.stone50,
        fontFamily: "Public Sans",
      }}
    >
      <div style={{ display: "flex", fontFamily: "Newsreader", fontSize: 40 }}>
        {firm.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        <div
          style={{
            color: colors.brass200,
            fontSize: 22,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {`Practicing in Boston since ${firm.founded}`}
        </div>
        <div
          style={{
            maxWidth: 900,
            fontFamily: "Newsreader",
            fontSize: 88,
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          Lawyers who tell you where you stand
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 28,
          borderTop: `1px solid ${colors.navy800}`,
          color: colors.stone300,
          fontSize: 24,
        }}
      >
        <span>{firm.address[1]}</span>
        <span>{firm.phone}</span>
      </div>
    </div>,
    { ...size, fonts: await loadFonts() }
  )
}

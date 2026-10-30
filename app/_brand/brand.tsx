import { readFile } from "node:fs/promises"
import { join } from "node:path"

// Satori doesn't understand oklch, so these are the palette tokens from
// globals.css converted to sRGB hex.
export const colors = {
  navy950: "#0c1625",
  navy800: "#233c61",
  brass200: "#e8ba7a",
  stone50: "#fcfaf6",
  stone300: "#d4d0ca",
}

const fontsDir = join(process.cwd(), "assets/fonts")

export async function loadFonts() {
  const [serif, sans] = await Promise.all([
    readFile(join(fontsDir, "Newsreader-Medium.ttf")),
    readFile(join(fontsDir, "PublicSans-Medium.ttf")),
  ])
  return [
    { name: "Newsreader", data: serif, weight: 500 as const },
    { name: "Public Sans", data: sans, weight: 500 as const },
  ]
}

// A navy tile with the firm's mark. "C&W" is too wide to read at tab size, so
// the browser favicon carries the brass ampersand alone and the larger
// home-screen icon spells out the initials.
export function Monogram({
  size,
  radius,
  compact = false,
}: {
  size: number
  radius: number
  compact?: boolean
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: colors.navy950,
        borderRadius: radius,
        color: colors.stone50,
        fontFamily: "Newsreader",
        fontSize: size * (compact ? 0.8 : 0.3),
      }}
    >
      {/* Flex centers the em box, but Newsreader's glyphs sit high in it.
          These offsets were measured from the rendered ink so the glyphs
          themselves land in the middle of the tile. */}
      <div
        style={{
          display: "flex",
          transform: compact
            ? `translate(${size * -0.008}px, ${size * 0.089}px)`
            : `translate(${size * -0.006}px, ${size * 0.038}px)`,
        }}
      >
        {compact ? (
          <span style={{ color: colors.brass200 }}>&</span>
        ) : (
          <>
            C<span style={{ color: colors.brass200 }}>&</span>W
          </>
        )}
      </div>
    </div>
  )
}

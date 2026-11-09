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

import { ImageResponse } from "next/og"

import { loadFonts, Monogram } from "./_brand/brand"

export const size = { width: 180, height: 180 }
export const contentType = "image/png"

// iOS rounds the corners itself, so the tile stays square.
export default async function AppleIcon() {
  return new ImageResponse(<Monogram size={size.width} radius={0} />, {
    ...size,
    fonts: await loadFonts(),
  })
}

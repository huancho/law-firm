import { ImageResponse } from "next/og"

import { loadFonts, Monogram } from "./_brand/brand"

export const size = { width: 64, height: 64 }
export const contentType = "image/png"

export default async function Icon() {
  return new ImageResponse(<Monogram size={size.width} radius={12} compact />, {
    ...size,
    fonts: await loadFonts(),
  })
}

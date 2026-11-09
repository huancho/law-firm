import type { Metadata, Viewport } from "next"
import { Newsreader, Public_Sans } from "next/font/google"

import "./globals.css"
import { firm } from "@/lib/firm"
import { cn } from "@/lib/utils"

const fontSans = Public_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-sans",
})

const fontSerif = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-serif",
})

const title = `${firm.legalName} · Boston law firm`
const description = `A Boston law firm handling business, litigation, family, real estate and estate planning matters since ${firm.founded}.`

// og:image and the icons come from the opengraph-image, icon and apple-icon
// files next to this layout. On Vercel, Next.js makes their URLs absolute.
export const metadata: Metadata = {
  title,
  description,
  applicationName: firm.name,
  openGraph: {
    type: "website",
    siteName: firm.legalName,
    locale: "en_US",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
}

// Navy: the browser chrome opens on the navy-950 hero.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#0c1625",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={cn(
        "antialiased",
        "font-sans",
        fontSans.variable,
        fontSerif.variable
      )}
    >
      <body>{children}</body>
    </html>
  )
}

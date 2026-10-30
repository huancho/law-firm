import type { Metadata, Viewport } from "next"
import { Newsreader, Public_Sans } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
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

// Navy in both schemes: the browser chrome sits on the hero and the scrolled
// header, which are navy-950 whatever the theme.
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
      suppressHydrationWarning
      className={cn(
        "antialiased",
        "font-sans",
        fontSans.variable,
        fontSerif.variable
      )}
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

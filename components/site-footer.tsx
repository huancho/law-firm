import { Eyebrow, Small } from "@/components/ui/typography"
import { firm, navigation } from "@/lib/firm"

const footerLink =
  "link-underline text-muted-foreground transition-colors before:absolute before:-inset-x-2 before:-inset-y-1.5 hover:text-foreground"

function SiteFooter() {
  // A wider brand column offset from two narrow link columns. They only share
  // a row at lg, where the office column is wide enough to keep the email on one line.
  return (
    <footer className="border-t-hairline">
      <div className="mx-auto grid max-w-6xl gap-x-6 gap-y-12 px-6 pt-16 pb-10 sm:grid-cols-2 lg:grid-cols-12">
        <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-5">
          <a
            href="#"
            className="relative self-start font-heading text-2xl tracking-tight before:absolute before:-inset-x-2 before:-inset-y-1.5"
          >
            {firm.name}
          </a>
          <Small className="max-w-sm text-pretty">
            The information on this website is for general purposes only and
            does not constitute legal advice. Contacting us does not create an{" "}
            <span className="whitespace-nowrap">attorney–client</span>{" "}
            relationship.
          </Small>
        </div>
        <nav
          aria-label="Footer"
          className="flex flex-col gap-4 lg:col-span-3 lg:col-start-7"
        >
          <Eyebrow className="text-foreground">Firm</Eyebrow>
          <ul className="flex flex-col items-start gap-3 text-small">
            {navigation.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={footerLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-4 lg:col-span-3 lg:col-start-10">
          <Eyebrow className="text-foreground">Office</Eyebrow>
          <address className="flex flex-col items-start gap-3 text-small text-muted-foreground not-italic">
            <span>
              {firm.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
            <a href={firm.phoneHref} className={footerLink}>
              {firm.phone}
            </a>
            <a href={`mailto:${firm.email}`} className={footerLink}>
              {firm.email}
            </a>
          </address>
        </div>
        <Small className="flex flex-col gap-2 border-t-hairline pt-6 sm:col-span-2 lg:col-span-12 lg:flex-row lg:justify-between">
          <span>
            © {new Date().getFullYear()} {firm.legalName}. All rights reserved.
          </span>
          <span>
            Attorney advertising. Prior results do not guarantee a similar
            outcome.
          </span>
        </Small>
      </div>
    </footer>
  )
}

export { SiteFooter }

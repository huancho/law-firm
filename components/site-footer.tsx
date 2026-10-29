import { Small } from "@/components/ui/typography"
import { firm } from "@/lib/firm"

function SiteFooter() {
  return (
    <footer className="border-t-hairline">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-14">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div className="flex flex-col gap-2">
            <p className="font-heading text-2xl">{firm.legalName}</p>
            <Small>
              {firm.address.join(", ")}
              <br />
              <a
                href={firm.phoneHref}
                className="relative transition-colors before:absolute before:-inset-y-2.5 hover:text-foreground"
              >
                {firm.phone}
              </a>
            </Small>
          </div>
          <Small className="max-w-md">
            The information on this website is for general purposes only and
            does not constitute legal advice. Contacting us does not create an
            attorney–client relationship.
          </Small>
        </div>
        <Small className="flex flex-col justify-between gap-2 border-t-hairline pt-6 sm:flex-row">
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

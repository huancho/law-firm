import { Button } from "@/components/ui/button"
import { Eyebrow, H1, H2, H3, Lead, P, Small } from "@/components/ui/typography"

export default function Page() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-24 px-6 py-24">
      <section className="flex flex-col gap-6">
        <Eyebrow>Trusted counsel since 1998</Eyebrow>
        <H1>Clear advice for the decisions that matter most</H1>
        <Lead>
          We represent individuals and businesses in disputes, transactions and
          family matters — with plain answers, steady guidance and attorneys who
          return your call.
        </Lead>
        <div>
          <Button size="lg">Schedule a consultation</Button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <Eyebrow>Practice areas</Eyebrow>
        <H2>Focused experience across five areas of law</H2>
        <div className="mt-8 grid gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <H3>Business &amp; Corporate</H3>
            <P>
              Formation, contracts, mergers and the day-to-day questions that
              come with running a company. We work as an extension of your team,
              not an outside vendor.
            </P>
          </div>
          <div className="flex flex-col gap-3">
            <H3>Family Law</H3>
            <P>
              Divorce, custody and support handled with discretion. Read our{" "}
              <a href="#">approach to mediation</a> before your first meeting.
            </P>
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <P>
          The information on this website is for general purposes only and does
          not constitute legal advice. Contacting us does not create an
          attorney–client relationship.
        </P>
        <Small>
          Attorney advertising. Prior results do not guarantee a similar
          outcome.
        </Small>
      </section>
    </main>
  )
}

import { firm } from "@/lib/firm"

// The firm name with its ampersand picked out in brass, the same glyph the
// favicon carries. Pass the brass step that reads on the surface behind it.
function Wordmark({ ampersandClassName }: { ampersandClassName: string }) {
  const [first, ...rest] = firm.name.split("&")

  return (
    <>
      {first}
      {rest.map((part, i) => (
        <span key={i}>
          <span className={ampersandClassName}>&amp;</span>
          {part}
        </span>
      ))}
    </>
  )
}

export { Wordmark }

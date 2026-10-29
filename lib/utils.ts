import { createCn } from "cn/config"

// Custom theme steps from globals.css. Without this, `text-h1` is read as a
// text color (and `border-t-hairline`, `shadow-raised` as colors too) and
// dropped when merged with something like `text-muted-foreground`.
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["h1", "h2", "h3", "lead", "body", "small", "eyebrow"] },
      ],
      "border-w": [{ border: ["hairline"] }],
      "border-w-t": [{ "border-t": ["hairline"] }],
      "border-w-b": [{ "border-b": ["hairline"] }],
      shadow: [{ shadow: ["raised", "raised-hover"] }],
    },
  },
})

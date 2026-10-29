import { createCn } from "cn/config"

// Custom type-scale steps from globals.css. Without this, `text-h1` is read as
// a text color and dropped when merged with something like `text-muted-foreground`.
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["h1", "h2", "h3", "lead", "body", "small", "eyebrow"] },
      ],
    },
  },
})

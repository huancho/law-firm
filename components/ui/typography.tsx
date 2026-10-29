import { cn } from "@/lib/utils"

function H1({ className, ...props }: React.ComponentProps<"h1">) {
  return (
    <h1
      data-slot="h1"
      className={cn("font-heading text-h1 text-balance", className)}
      {...props}
    />
  )
}

function H2({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="h2"
      className={cn("font-heading text-h2 text-balance", className)}
      {...props}
    />
  )
}

function H3({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="h3"
      className={cn("font-heading text-h3 text-balance", className)}
      {...props}
    />
  )
}

function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="eyebrow"
      className={cn("text-eyebrow text-muted-foreground uppercase", className)}
      {...props}
    />
  )
}

function Lead({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="lead"
      className={cn(
        "max-w-prose text-lead text-pretty text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

function P({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="p"
      className={cn(
        "max-w-prose text-body [&_a]:underline [&_a]:decoration-from-font [&_a]:underline-offset-[0.2em]",
        className
      )}
      {...props}
    />
  )
}

function Small({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="small"
      className={cn("text-small text-muted-foreground", className)}
      {...props}
    />
  )
}

export { H1, H2, H3, Eyebrow, Lead, P, Small }

import * as motion from "motion/react-client"

import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4">
      <motion.h1
        className="text-4xl font-semibold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Hello World
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
      >
        <Button>Click me</Button>
      </motion.div>
    </main>
  )
}

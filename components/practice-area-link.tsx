"use client"

// Jumps to the contact form with this practice area already selected. Without
// JavaScript it is still a plain link to the form.
function PracticeAreaLink({
  area,
  ...props
}: React.ComponentProps<"a"> & { area: string }) {
  return (
    <a
      href="#contact"
      onClick={() => {
        // The select is uncontrolled, so setting its value is enough.
        const select = document.getElementById("area")
        if (select instanceof HTMLSelectElement) select.value = area
      }}
      {...props}
    />
  )
}

export { PracticeAreaLink }

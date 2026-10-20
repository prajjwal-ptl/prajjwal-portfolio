import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Portfolio } from "../../src/routes/index"

describe("Portfolio page", () => {
  it("renders Prajjwal Patel's name", () => {
    render(<Portfolio />)

    expect(screen.getByRole("link", { name: "Prajjwal Patel home" })).toBeInTheDocument()
  })

  it("gives every selected project link a valid HTTP(S) href", () => {
    const { container } = render(<Portfolio />)
    const projectLinks = Array.from(
      container.querySelectorAll<HTMLAnchorElement>("#work .project-card .project-actions a"),
    )

    // Two links each for CarePilot and the portfolio, plus the Soroban source repository.
    expect(projectLinks).toHaveLength(5)

    for (const link of projectLinks) {
      const href = link.getAttribute("href")
      expect(href, `Missing href on project link "${link.textContent?.trim()}"`).toBeTruthy()

      const url = new URL(href!, "https://portfolio.test")
      expect(["http:", "https:"]).toContain(url.protocol)
      expect(url.hostname).toBeTruthy()
    }
  })

  it("uses the correct contact email address", () => {
    render(<Portfolio />)

    expect(screen.getByRole("link", { name: /Email me/i })).toHaveAttribute(
      "href",
      "mailto:patelprajjwal7@gmail.com",
    )
  })

  it("renders LeetCode badge data", () => {
    render(<Portfolio />)

    expect(screen.getByText("500 Days Badge")).toBeInTheDocument()
    expect(screen.getByText("LeetCode 75")).toBeInTheDocument()
  })
})

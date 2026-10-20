import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Portfolio } from "../../src/routes/index"

describe("Portfolio page", () => {
  it("renders the hero and the three selected project cards", () => {
    render(<Portfolio />)

    expect(screen.getByRole("heading", { name: /junior GenAI roles/i })).toBeInTheDocument()
    expect(screen.getByText("CarePilot — Customer Support Retrieval Demo")).toBeInTheDocument()
    expect(screen.getByText("GitHub Portfolio Website")).toBeInTheDocument()
    expect(screen.getByText("Soroban Dice Game Contract Prototype")).toBeInTheDocument()
  })

  it("renders LeetCode badges without a missing-data runtime error", () => {
    render(<Portfolio />)

    expect(screen.getByText("500 Days Badge")).toBeInTheDocument()
    expect(screen.getByText("LeetCode 75")).toBeInTheDocument()
  })
})

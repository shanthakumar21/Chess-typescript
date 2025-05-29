import { Board, Piece } from "./types"

export function initialBoard(): Board {
  const e = null
  const makeRow = (color: "w" | "b", types: string[]): Piece[] =>
    types.map(t => ({ type: t as any, color }))
  return [
    makeRow("b", ["R", "N", "B", "Q", "K", "B", "N", "R"]),
    Array(8).fill({ type: "P", color: "b" }),
    [e, e, e, e, e, e, e, e],
    [e, e, e, e, e, e, e, e],
    [e, e, e, e, e, e, e, e],
    [e, e, e, e, e, e, e, e],
    Array(8).fill({ type: "P", color: "w" }),
    makeRow("w", ["R", "N", "B", "Q", "K", "B", "N", "R"])
  ]
}

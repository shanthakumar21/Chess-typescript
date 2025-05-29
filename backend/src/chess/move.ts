import { Board, Move } from "./types"

export function applyMove(board: Board, move: Move): Board {
  const next = board.map(row => row.slice())
  const p = next[move.from[0]][move.from[1]]
  next[move.from[0]][move.from[1]] = null
  next[move.to[0]][move.to[1]] = p
  return next
}

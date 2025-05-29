import { Board, Move, Color } from "./types"

export function getLegalMoves(board: Board, from: [number, number]): Move[] {
  const [r, c] = from
  const piece = board[r][c]
  if (!piece) return []
  if (piece.type === "P") return pawnMoves(board, from, piece.color)
  if (piece.type === "R") return rookMoves(board, from, piece.color)
  if (piece.type === "N") return knightMoves(board, from, piece.color)
  if (piece.type === "B") return bishopMoves(board, from, piece.color)
  return []
}

function pawnMoves(board: Board, from: [number, number], color: Color): Move[] {
  const [r, c] = from
  const d = color === "w" ? -1 : 1
  const out: Move[] = []
  if (board[r + d] && board[r + d][c] === null) {
    out.push({ from, to: [r + d, c] })
    if ((color === "w" && r === 6) || (color === "b" && r === 1)) {
      if (board[r + 2 * d] && board[r + 2 * d][c] === null) {
        out.push({ from, to: [r + 2 * d, c] })
      }
    }
  }
  for (const dc of [-1, 1]) {
    if (
      board[r + d] &&
      board[r + d][c + dc] &&
      board[r + d][c + dc] !== null &&
      board[r + d][c + dc]?.color !== color
    ) {
      out.push({ from, to: [r + d, c + dc] })
    }
  }
  return out
}

function rookMoves(board: Board, from: [number, number], color: Color): Move[] {
  const [r, c] = from
  const out: Move[] = []
  for (const [dr, dc] of [[1,0], [-1,0], [0,1], [0,-1]]) {
    let rr = r + dr, cc = c + dc
    while (rr >= 0 && rr < 8 && cc >= 0 && cc < 8) {
      if (!board[rr][cc]) out.push({ from, to: [rr, cc] })
      else {
        if (board[rr][cc]?.color !== color) out.push({ from, to: [rr, cc] })
        break
      }
      rr += dr
      cc += dc
    }
  }
  return out
}

function knightMoves(board: Board, from: [number, number], color: Color): Move[] {
  const [r, c] = from
  const out: Move[] = []
  for (const [dr, dc] of [[-2,-1], [-2,1], [-1,-2], [-1,2], [1,-2], [1,2], [2,-1], [2,1]]) {
    const rr = r + dr, cc = c + dc
    if (rr >= 0 && rr < 8 && cc >= 0 && cc < 8) {
      if (!board[rr][cc] || board[rr][cc]?.color !== color) {
        out.push({ from, to: [rr, cc] })
      }
    }
  }
  return out
}

function bishopMoves(board: Board, from: [number, number], color: Color): Move[] {
  const [r, c] = from
  const out: Move[] = []
  for (const [dr, dc] of [[1,1], [1,-1], [-1,1], [-1,-1]]) {
    let rr = r + dr, cc = c + dc
    while (rr >= 0 && rr < 8 && cc >= 0 && cc < 8) {
      if (!board[rr][cc]) out.push({ from, to: [rr, cc] })
      else {
        if (board[rr][cc]?.color !== color) out.push({ from, to: [rr, cc] })
        break
      }
      rr += dr
      cc += dc
    }
  }
  return out
}

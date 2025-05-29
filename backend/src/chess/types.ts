export type PieceType = "P" | "N" | "B" | "R" | "Q" | "K"
export type Color = "w" | "b"

export interface Piece {
  type: PieceType
  color: Color
}

export type Square = Piece | null
export type Board = Square[][]
export interface Move {
  from: [number, number]
  to: [number, number]
  promotion?: PieceType
}

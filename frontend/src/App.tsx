import React, { useEffect, useState } from "react"
import axios from "axios"

const backendUrl = "http://localhost:4000"

type PieceType = "P" | "N" | "B" | "R" | "Q" | "K"
type Color = "w" | "b"
type Piece = { type: PieceType; color: Color } | null
type Board = Piece[][]

function pieceSymbol(piece: Piece) {
  if (!piece) return ""
  const symbols: Record<PieceType, string> = {
    "P": "♙",
    "N": "♘",
    "B": "♗",
    "R": "♖",
    "Q": "♕",
    "K": "♔"
  }
  const s = symbols[piece.type]
  return piece.color === "w" ? s : s.replace("♙", "♟").replace("♖", "♜").replace("♘", "♞").replace("♗", "♝").replace("♕", "♛").replace("♔", "♚")
}

function App() {
  const [board, setBoard] = useState<Board>([])
  const [turn, setTurn] = useState<Color>("w")
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [message, setMessage] = useState("")

  useEffect(() => {
    axios.post(`${backendUrl}/start`).then(res => {
      setBoard(res.data.board)
      setTurn(res.data.turn)
      setMessage("")
      setSelected(null)
    })
  }, [])

  function handleSquareClick(row: number, col: number) {
    if (!selected) {
      if (board[row][col] && board[row][col]?.color === turn) setSelected([row, col])
    } else {
      axios.post(`${backendUrl}/move`, { from: selected, to: [row, col] })
        .then(res => {
          setBoard(res.data.board)
          setTurn(res.data.turn)
          setMessage("")
          setSelected(null)
        })
        .catch(err => {
          setMessage(err.response?.data?.error || "Invalid move")
          setSelected(null)
        })
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Chess App</h2>
      <button onClick={() => window.location.reload()}>Restart</button>
      <div style={{ margin: 10 }}>Turn: {turn === "w" ? "White" : "Black"}</div>
      <div style={{ color: "red", marginBottom: 10 }}>{message}</div>
      <div style={{
        display: "grid",
        gridTemplateRows: "repeat(8, 50px)",
        gridTemplateColumns: "repeat(8, 50px)",
        border: "2px solid #444"
      }}>
        {board.map((row, i) =>
          row.map((piece, j) => {
            const selectedStyle = selected && selected[0] === i && selected[1] === j ? { background: "#fe0" } : {}
            const color = (i + j) % 2 === 0 ? "#eee" : "#888"
            return (
              <div
                key={`${i}-${j}`}
                onClick={() => handleSquareClick(i, j)}
                style={{
                  width: 50, height: 50, display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontSize: 28, background: color, border: "1px solid #555", cursor: "pointer", ...selectedStyle
                }}>
                {pieceSymbol(piece)}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default App

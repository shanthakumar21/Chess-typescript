import React, { useEffect, useState } from "react"
import axios from "axios"

const backendUrl = "http://localhost:4000"

type PieceType = "P" | "N" | "B" | "R" | "Q" | "K"
type Color = "w" | "b"
type Piece = { type: PieceType; color: Color } | null
type Board = Piece[][]

function pieceSymbol(piece: Piece) {
  if (!piece) return ""
  const symbols: Record<PieceType, [string, string]> = {
    P: ["♙", "♟"],
    N: ["♘", "♞"],
    B: ["♗", "♝"],
    R: ["♖", "♜"],
    Q: ["♕", "♛"],
    K: ["♔", "♚"]
  }
  return piece.color === "w" ? symbols[piece.type][0] : symbols[piece.type][1]
}

export default function App() {
  const [board, setBoard] = useState<Board>([])
  const [turn, setTurn] = useState<Color>("w")
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [message, setMessage] = useState("")

  // Responsive board size
  const [boardSize, setBoardSize] = useState(0)
  useEffect(() => {
    function handleResize() {
      // Fit to 90% of viewport min dimension, up to a max (e.g., 600px)
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.9
      setBoardSize(Math.min(size, 600))
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

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

  // Calculate square size for responsive board
  const squareSize = boardSize / 8

  return (
    <div style={{
      minHeight: "100vh",
      minWidth: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "radial-gradient(ellipse at center, #ccd6b6 0%, #97ae77 100%)"
    }}>
      <div style={{
        background: "#262523",
        padding: 24,
        borderRadius: 20,
        boxShadow: "0 2px 32px #0006",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        <h2 style={{ color: "#fff", marginBottom: 16 }}>Chess App</h2>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: "8px 20px", background: "#97ae77", color: "#222", border: "none", borderRadius: 8, fontWeight: "bold", marginBottom: 16, cursor: "pointer"
          }}>
          Restart
        </button>
        <div style={{ margin: 10, color: "#ddd", fontSize: 18, fontWeight: 500 }}>
          Turn: {turn === "w" ? "White" : "Black"}
        </div>
        <div style={{ color: "#e66", marginBottom: 16, minHeight: 24, fontSize: 16 }}>{message}</div>
        <div style={{
          display: "grid",
          gridTemplateRows: `repeat(8, ${squareSize}px)`,
          gridTemplateColumns: `repeat(8, ${squareSize}px)`,
          border: "5px solid #384930",
          borderRadius: 14,
          boxShadow: "0 4px 16px #2227",
          width: boardSize,
          height: boardSize,
          background: "#384930"
        }}>
          {board.map((row, i) =>
            row.map((piece, j) => {
              const selectedStyle = selected && selected[0] === i && selected[1] === j ? { boxShadow: "0 0 0 4px #fce96b inset" } : {}
              const color = (i + j) % 2 === 0 ? "#e6eed1" : "#769656"
              return (
                <div
                  key={`${i}-${j}`}
                  onClick={() => handleSquareClick(i, j)}
                  style={{
                    width: squareSize, height: squareSize, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: squareSize * 0.65, background: color, border: "1px solid #444",
                    cursor: "pointer", userSelect: "none", transition: "background 0.2s", ...selectedStyle
                  }}>
                  <span style={{
                    color: piece?.color === "w" ? "#fff" : "#222",
                    filter: piece?.color === "b" ? "drop-shadow(0 0 2px #555)" : "",
                    fontWeight: piece?.color === "b" ? 900 : 600,
                  }}>
                    {pieceSymbol(piece)}
                  </span>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

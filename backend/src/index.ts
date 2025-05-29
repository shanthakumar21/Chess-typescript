import express from "express"
import cors from "cors"
import { initialBoard } from "./chess/board"
import { getLegalMoves } from "./chess/rules"
import { applyMove } from "./chess/move"
import { Board } from "./chess/types"

const app = express()
app.use(cors())
app.use(express.json())

let board: Board = initialBoard()
let turn: "w" | "b" = "w"

app.post("/start", (req, res) => {
  board = initialBoard()
  turn = "w"
  res.json({ board, turn })
})

app.post("/move", (req, res) => {
  const { from, to } = req.body
  const moves = getLegalMoves(board, from).map(m => JSON.stringify(m.to))
  if (moves.includes(JSON.stringify(to))) {
    board = applyMove(board, { from, to })
    turn = turn === "w" ? "b" : "w"
    res.json({ board, turn })
  } else {
    res.status(400).json({ error: "Invalid move" })
  }
})

app.get("/game", (req, res) => {
  res.json({ board, turn })
})

app.listen(4000, () => console.log("Backend running on http://localhost:4000"))

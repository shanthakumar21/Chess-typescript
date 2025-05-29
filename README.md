  # Chess TypeScript App
  
**Project Overview**
This project is a fullstack Chess application built entirely with TypeScript. It features a custom backend that handles all chess logic (no third-party chess engines or rules libraries), and a modern frontend that provides a playable user interface in the browser.

Backend: Node.js with Express and TypeScript. All chess rules, move validation, and game state are handled server-side.

Frontend: React (with Vite and TypeScript). The UI is responsive, visually styled, and communicates with the backend using REST API endpoints.

The app can be run in development mode or fully containerized with Docker and Docker Compose.

**Features**

Chess game logic written from scratch in TypeScript 

RESTful API endpoints to start a game, make moves, and get the current game state

Responsive React frontend with chessboard UI

Easy to run locally or as containers with Docker Compose

## Run the whole app (backend + frontend) with Docker Compose

```bash
docker-compose build
docker-compose up
```


->Open http://localhost:5173 for the frontend

->Open http://localhost:4000 for the backend API



Run backend and frontend separately (without Docker)

Backend
Open a new terminal:

```
cd backend
npm install
npm run build
npm start
```

->API runs on http://localhost:4000

Frontend
Open a new terminal:
```
cd frontend
npm install
npm run dev
```

->App runs on http://localhost:5173


API Endpoints (Backend)
POST /start — Start or restart a game

POST /move — Make a move (send JSON: { "from": [row, col], "to": [row, col] })

GET /game — Get the current board


How to use
Go to http://localhost:5173 in your browser to play chess in the UI

All logic is TypeScript, both backend and frontend

  # Chess TypeScript App

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

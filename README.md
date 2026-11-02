# Notes App

A full stack notes app where you can add, view, edit, and delete notes. Notes are saved in a database, so they are still there after the server restarts.

## Features

- Add a new note
- See all notes in a list
- Edit a note and save the change
- Delete a note
- Pages switch with routes (Home, Notes, Add Note)

## Tech Stack

- **Frontend:** React, React Router, Vite, CSS
- **Backend:** Python, Flask, Flask-CORS
- **Database:** SQLite

## API Routes

| Method | Route | What it does |
| ------ | ----- | ------------ |
| GET | `/notes` | Get all notes |
| POST | `/notes` | Add a new note |
| PUT | `/notes/<id>` | Edit a note |
| DELETE | `/notes/<id>` | Delete a note |

## How to Run It

You need Python and Node.js installed.

**1. Start the backend**

```
pip install flask flask-cors
python app.py
```

The API runs at `http://127.0.0.1:5000`. The database file `notes.db` is created the first time you start it.

**2. Start the frontend** (in a second terminal)

```
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## What I Learned

- Building routes and a database layer with Flask and SQLite
- Connecting a React frontend to an API with `fetch`
- Managing state with `useState` and `useEffect`
- Using Git and GitHub
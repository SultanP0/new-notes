
from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3


app = Flask(__name__)
CORS(app)


def get_db():
    conn = sqlite3.connect("notes.db")
    return conn


def init_db():
    conn = get_db()
    conn.execute(
        "CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT NOT NULL)")
    conn.commit()
    conn.close()


@app.route('/')
def home():
    return jsonify({"message": "Notes API is running"})


@app.route('/notes')
def get_notes():
    conn = get_db()
    rows = conn.execute("SELECT id, text FROM notes").fetchall()
    conn.close()

    result = []
    for row in rows:
        result.append({"id": row[0], "text": row[1]})

    return jsonify(result)


@app.route('/notes', methods=["POST"])
def add_note():
    data = request.get_json()
    conn = get_db()
    cursor = conn.execute(
        "INSERT INTO notes (text) VALUES (?)", (data["text"],))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    new_note = {"id": new_id, "text": data["text"]}
    return jsonify(new_note), 201


@app.route('/notes/<int:note_id>', methods=["DELETE"])
def delete_note(note_id):
    conn = get_db()
    conn.execute("DELETE FROM notes WHERE id = ?", (note_id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Note deleted"})



@app.route('/notes/<int:note_id>', methods=["PUT"])
def update_note(note_id):
    data = request.get_json()
    conn = get_db()
    conn.execute("UPDATE notes SET text = ? WHERE id = ?", (data["text"], note_id))
    conn.commit()
    conn.close()
    return jsonify({"id": note_id, "text": data["text"]})












if __name__ == '__main__':
    init_db()
    app.run(debug=True)

import { useState, useEffect } from "react";

function Notes() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:5000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  function handleDelete(id) {
    fetch(`http://127.0.0.1:5000/notes/${id}`, {
      method: "DELETE",
    }).then(() => setNotes(notes.filter((note) => note.id !== id)));
  }

  function startEdit(note) {
    setEditingId(note.id);
    setEditText(note.text);
  }

  function handleSave(id) {
    fetch(`http://127.0.0.1:5000/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: editText }),
    })
      .then((res) => res.json())
      .then((updated) => {
        setNotes(notes.map((note) => (note.id === id ? updated : note)));
        setEditingId(null);
      });
  }

  return (
    <div>
      <h1>Notes Page</h1>
      {notes.length === 0 && <p>No notes yet.</p>}
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {editingId === note.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  className="add-button"
                  onClick={() => handleSave(note.id)}
                >
                  Save
                </button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {note.text}
                <button onClick={() => startEdit(note)}>Edit</button>
                <button onClick={() => handleDelete(note.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notes;
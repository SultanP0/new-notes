import { useState } from "react";

function AddNote() {
  const [text, setText] = useState("");

  function handleAdd() {
fetch("http://127.0.0.1:5000/notes", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: text }),
}).then(() => setText(""))
}

  return (
    <div>
      <h1>Add Note Page</h1>
      <input
        type="text"
        placeholder="Write a note."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></input>

      <button className="add-button" onClick={handleAdd}>Add Note</button>
    </div>
  );
}

export default AddNote;

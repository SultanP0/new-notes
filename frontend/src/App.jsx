import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Notes from "./pages/Notes";
import AddNote from "./pages/AddNote";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/notes">Notes</Link>
        <Link to="/add">AddNotes</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/add" element={<AddNote />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

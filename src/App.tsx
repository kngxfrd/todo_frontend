import { useState } from "react";
import "./App.css";
import { FaCirclePlus } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { TfiTrash } from "react-icons/tfi";

function App() {
  type Note = {
    id: number;
    text: string;
    completed: boolean;
  };
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const handleApply = () => {
    if (input.trim() === "") return;

    if (editingNote) {
      setNotes(
        notes.map((note) =>
          note.id === editingNote.id ? { ...note, text: input } : note,
        ),
      );
    } else {
      const newNote = {
        id: Date.now(),
        text: input,
        completed: false,
      };
      setNotes([...notes, newNote]);
    }

    setInput("");
    setEditingNote(null);
    setOpen(false);
  };
  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };
  return (
    <div>
      <div className="head">
        <h3>TODO LIST</h3>
      </div>
      <div className="searchbox">
        <input className="searchbar" type="text" placeholder="Search note..." />
        <button className="filterbutton">All</button>
      </div>
      <div className="lists"></div>

      <FaCirclePlus className="plusbutton" onClick={() => setOpen(true)} />

      <div className="lists">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <input
              className="checkbox"
              type="checkbox"
              checked={note.completed}
              onChange={() =>
                setNotes(
                  notes.map((item) =>
                    item.id === note.id
                      ? { ...item, completed: !item.completed }
                      : item,
                  ),
                )
              }
            />
            <span className={note.completed ? "done" : ""}>{note.text}</span>
            <div className="listbutton">
              <GoPencil
                onClick={() => {
                  setEditingNote(note);
                  setInput(note.text);
                  setOpen(true);
                }}
              />
              <TfiTrash onClick={() => deleteNote(note.id)} />
            </div>
          </div>
        ))}
      </div>

      {open && (
        <>
          <div className="overlay"></div>
          <div className="modalbox">
            <h3>NEW NOTE</h3>
            <input
              type="text"
              className="notebox"
              placeholder="Input your note"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="cancelbutton " onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="applybutton" onClick={handleApply}>
              Apply
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

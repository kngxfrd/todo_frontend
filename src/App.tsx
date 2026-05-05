import { useState } from "react";
import "./App.css";
import { FaCirclePlus } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { TfiTrash } from "react-icons/tfi";

function App() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [checked, setChecked] = useState(false);
  const addNote = () => {
    if (input.trim() === "") return;
    const newNote = {
      id: Date.now(),
      text: input,
      completed: false,
    };
    setNotes([...notes, newNote]);
    setInput("");
    setOpen(false);
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
            <GoPencil className="listbutton" />
            <TfiTrash className="listbutton" />
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
            <button className="applybutton" onClick={addNote}>
              Apply
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

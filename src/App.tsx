import { useState } from "react";
import "./App.css";
import { FaCirclePlus } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { TfiTrash } from "react-icons/tfi";
import { IoIosArrowDown } from "react-icons/io";
function App() {
  type Note = {
    id: number;
    text: string;
    completed: boolean;
  };
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState("");
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

  const filteredNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div className="app">
      <div className="text-md text-black font-bold">
        <h3>TODO LIST</h3>
      </div>
      <div className=" flex item-center justify-center gap-4 pt-5">
        <input
          className=" border rounded-sm sm:w-sm h-8 pl-4 border-[#6c63ff] focus:outline-0"
          type="text"
          placeholder="Search note..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className=" text-md">
          <div className="border -mt-1 p-2 px-2 py-0.5 flex gap-2 mt-0.5 bg-[#6c63ff] text-white rounded-sm">
            All
            <IoIosArrowDown className="mt-1" size={18} />
          </div>
        </button>
      </div>

      <div className="flex item-center justify-center pt-2">
        <div className="w-md  text-center  ">
          {notes.length === 0 ? (
            <div>
              <div className="flex item-center pt-20 justify-center">
                <img
                  src="src/assets/emptyimg.png"
                  alt="No tasks"
                  className="emptyimg"
                />
              </div>
              <h3>Empty...</h3>
            </div>
          ) : filteredNotes.length === 0 ? (
            <p>No matching tasks found</p>
          ) : (
            filteredNotes.map((note) => (
              <div className="w-md text-center">
                <div
                  key={note.id}
                  className="flex justify-between border-b border-[#6c63ff] py-6"
                >
                  <div className="flex items-center">
                    <input
                      className="size-6 accent-[#6c63ff] border border-[#6c63ff]"
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
                    <span
                      className={
                        note.completed ? "line-through text-gray pl-5" : "pl-5"
                      }
                    >
                      {note.text}
                    </span>
                  </div>
                  <div className="flex gap-3">
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
              </div>
            ))
          )}
        </div>
      </div>
      <div className="fixed bottom-6 sm:bottom-10 right-90 ml-auto">
        <FaCirclePlus size={40} color="#6c63ff" onClick={() => setOpen(true)} />
      </div>

      {open && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white border border-[#6c63ff] rounded-md w-80 p-4 flex flex-col justify-between h-56">
              <h3 className="text-lg font-semibold">NEW NOTE</h3>

              <input
                autoFocus
                type="text"
                className="border border-[#6c63ff] p-2 w-full rounded focus:outline-0"
                placeholder="Input your note"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

              <div className="flex justify-end gap-35">
                <button
                  className="bg-white px-3 py-1 rounded border border-[#6c63ff] text-[#6c63ff]"
                  onClick={() => {
                    setOpen(false);
                    setInput("");
                    setEditingNote(null);
                  }}
                >
                  Cancel
                </button>

                <button
                  className="bg-[#6c63ff] text-white px-3 py-1 rounded"
                  onClick={handleApply}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

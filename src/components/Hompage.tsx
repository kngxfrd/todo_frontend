import { useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { TfiTrash } from "react-icons/tfi";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import type { Task } from "../services/auth";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import DeleteModal from "./DeleteModal";

function Hompage() {
  function handleLogout() {
   localStorage.clear(); 
    navigate("/");
  }
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [notes, setNotes] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [editingNote, setEditingNote] = useState<Task | null>(null);


  
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchTasks();
  }, []);

  async function fetchTasks() {
      console.log("Fetching with token:", localStorage.getItem("token"));
    const data = await getTasks();
    setNotes(data.tasks);
    setLoading(false);
  }
  const handleApply = async () => {
    if (input.trim() === "") return;

    if (editingNote) {
      const updated = await updateTask(editingNote.id, {
        title: input,
        description,
      });
      setNotes(
        notes.map((note) => (note.id === editingNote.id ? updated : note)),
      );
    } else {
      const newTask = await createTask({
        title: input,
        description,
      });
      setNotes([...notes, newTask]);
    }
    setInput("");
    setDescription("");
    setEditingNote(null);
    setOpen(false);
  };
  const deleteNote = async () => {
    if (deleteId === null) return;
    await deleteTask(deleteId);
    setNotes(notes.filter((note) => note.id !== deleteId));
    setDeleteId(null);
  };

  function formatDate(dateString: string) {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateString));
  }

 const filteredNotes = notes
  .filter((note) => note.title.toLowerCase().includes(search.toLowerCase()))
  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  ;



  return (
    <>
      <div className="">
        <div className="relative flex items-center justify-center py-4">
          <div className=" text-md text-black font-bold text-[24px]">
            <h1>TODO LIST</h1>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={handleLogout}
              className=" absolute right-20 text-sm border border-[#6c63ff] text-[#6c63ff] px-4 py-1 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
        <div className=" flex item-center justify-center gap-4 pt-5">
          <input
            className=" border rounded-sm w-sm text-sm h-8 pl-3 border-[#6c63ff] focus:outline-0 font-inter"
            type="text"
            placeholder="Search note..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className=" text-sm">
            <div className="h-7 -mt-1 p-2 px-2 py-0.5 flex gap-2 mt-0.5 bg-[#6c63ff] text-white rounded-sm font-kanit">
              All
              <IoIosArrowDown className="mt-1" size={18} />
            </div>
          </button>
        </div>

        <div className="flex item-center justify-center pt-2">
          <div className="w-md  text-center">
            {loading ? (
              <p>Loading...</p>
            ) : notes.length === 0 ? (
              <div>
                <div className="flex items-center pt-20 justify-center">
                  <img
                    src="src/assets/emptyimg.png"
                    alt="No tasks"
                    className="emptyimg"
                  />
                </div>
                <h1 className="text-[20px] text-gray-500">Empty...</h1>
              </div>
            ) : filteredNotes.length === 0 ? (
              <p>No matching tasks found</p>
            ) : (
              filteredNotes.map((note) => (
                <div key={note.id} className="w-md text-left">
                  <div
                    key={note.id}
                    className="flex justify-between border-b border-[#6c63ff] py-4"
                  >
                    <div className="flex items-center">
                      <input
                        className="size-6 accent-[#6c63ff]  border-[#6c63ff]"
                        type="checkbox"
                        checked={note.completed}
                        onChange={async () => {
                          const updated = await updateTask(note.id, {
                            completed: !note.completed,
                          });
                          setNotes(
                            notes.map((item) =>
                              item.id === note.id ? updated : item,
                            ),
                          );
                        }}
                      />
                      <div className=" ">
                        <div className="flex">
                          <span
                            className={
                              note.completed
                                ? "line-through text-gray pl-5"
                                : "pl-5 font-kanit"
                            }
                          >
                            <div className="flex  pb-1">{note.title}</div>
                          </span>
                          <p className="text-[10px] text-gray-300 pl-3 pt-1.5">
                            {formatDate(note.created_at)}
                          </p>
                        </div>

                        {note.description && (
                          <p
                            className={
                              note.completed
                                ? "line-through text-xs text-gray-400 pl-5"
                                : "text-xs text-gray-400 pl-5"
                            }
                          >
                            {note.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3 pt-3">
                      <GoPencil
                        onClick={() => {
                          setEditingNote(note);
                          setInput(note.title);
                          setDescription(note.description ?? "");
                          setOpen(true);
                        }}
                      />
                      <TfiTrash onClick={() => setDeleteId(note.id)} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="fixed bottom-10 right-20">
          <FaCirclePlus
            size={40}
            color="#6c63ff"
            onClick={() => setOpen(true)}
          />
        </div>

        {deleteId !== null && (
          <DeleteModal
            onCancel={() => setDeleteId(null)}
            onConfirm={deleteNote}
          />
        )}

        {open && (
          <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/50">
              <div className="bg-white border border-[#6c63ff] rounded-md w-80 p-4 flex flex-col justify-between h-65">
                <h3 className="text-lg font-semibold">NEW NOTE</h3>

                <input
                  autoFocus
                  type="text"
                  className="border border-[#6c63ff] p-2 w-full rounded focus:outline-0 font-inter text-sm text-black"
                  placeholder="Input your note"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <textarea
                  className="border border-[#6c63ff] p-2 w-full rounded focus:outline-0 font-inter text-sm text-black"
                  placeholder="Add a description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div className="flex justify-end gap-35">
                  <button
                    className="bg-white px-3 py-1 rounded-md border border-[#6c63ff] text-[#6c63ff]"
                    onClick={() => {
                      setOpen(false);
                      setInput("");
                      setDescription("");
                      setEditingNote(null);
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    className="bg-[#6c63ff] text-white px-3 py-1 rounded-md font-inter"
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
    </>
  );
}

export default Hompage;

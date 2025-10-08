import React, { useState } from "react";
import NoteModal from "../components/NoteModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import { useEffect } from "react";
import { UserAuth } from "../context/ContextProvider";
import { toast } from "react-toastify";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState([]);
  const { query } = UserAuth();
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const LOCAL_URL = import.meta.env.VITE_LOCAL_URI;

  useEffect(() => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentNote(null);
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      const { data } = await axios.get(
        `${API_URL || LOCAL_URL || "http://localhost:5000"}/api/note`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes(data.notes);
    } catch (error) {
      if (error.response?.status === 401) {
        console.log({ message: "Invalid or expired token" });
      } else {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    fetchNotes();
  }, []);
  
  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        `${API_URL || LOCAL_URL || "http://localhost:5000"}/api/note/add`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data) {
        fetchNotes();
        toast.success("Note Added Successfully");
        closeModal();
        navigate("/");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL || LOCAL_URL || "http://localhost:5000"}/api/note/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data) {
        await fetchNotes();
        toast.success("Note Deleted Successfully");
      }
    } catch (error) {
      setError(console.log(error, { message: "error deleting notes" }));
    }
  };
  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `${API_URL || LOCAL_URL || "http://localhost:5000"}/api/note/${id}`,
        { title, description },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (response.data) {
        await fetchNotes();
        toast.success("Note Updated Successfully");
        closeModal();
        navigate("/");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="px-8 pt-4 grid grid-cols-1 gap-4 md:grid-cols-3 ">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onEdit={onEdit}
              deleteNote={deleteNote}
            />
          ))
        ) : (
          <p>No Notes Found</p>
        )}
      </div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-6 rounded-full"
      >
        +
      </button>
      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;

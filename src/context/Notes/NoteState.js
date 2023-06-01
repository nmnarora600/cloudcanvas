import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    // const host = "http://localhost:5000";
  let notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //GEt all Note
  const getNote = async () => {
    const response = await fetch(`/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();

    setNotes(json);
  };
  //Add Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`/api/notes/addnew`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json=await response.json();

    let note = {
      _id: json.note._id,
      user: "64511cbc2a80d29bf22528bd",
      title: title,
      description: description,
      tag: tag,
      date: "2023-05-03T13:57:05.061Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  //Delete Note
  const deleteNote = async (id) => {
    const response = await fetch(`/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      
    });
   await response.json();


    let newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
     await response.json();

    let newNote=JSON.parse(JSON.stringify(notes))
    for (let idx = 0; idx < notes.length; idx++) {
      const element = newNote[idx];
      if (element._id === id) {
        newNote[idx].title = title;
        newNote[idx].description = description;
        newNote[idx].tag = tag;
        break;
      }
    }

    setNotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;

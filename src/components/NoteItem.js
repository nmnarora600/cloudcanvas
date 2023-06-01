import React from 'react'
import { useContext } from 'react';
import NoteContext from '../context/Notes/noteContext';

export default function NoteItem(props) {
const note=props.notes;
let context=useContext(NoteContext);
let {deleteNote}=context
const {updateNote}=props
  return (
    <div className='col-md-3 my-3'>
     <div className="card" >
  <div className="card-body">
    <h3 className="card-title">{note.title}</h3>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-trash-can mx-2" onClick={()=>{deleteNote(note._id);
    props.showAlert("Note Deleted", "success")}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateNote(note)}></i>
    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
  </div>
</div>
    </div>
  )
}

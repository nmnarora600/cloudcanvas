
import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/Notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';

export default function App() {
const [alert, setAlert]=useState(null);
const showAlert=(message, type)=>{
setAlert({msg:message
  ,type:type})

  setTimeout(()=>{
    setAlert(null)
  },1500);
}

  return (
    <div>
      <NoteState>
      <Router>
        <Navbar showAlert={showAlert}/>
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert}/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<Login showAlert={showAlert}/>}/>
          <Route path="/signup" element={<Signup showAlert={showAlert}/>}/>
        </Routes>
        </div>
        <Footer/>
      </Router>
    
      </NoteState>
    </div>
  )
}



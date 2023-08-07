import React from 'react'
import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './components/additional/About';



export default function App() {
  return <>
    <Router>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </Router>
  </>
}


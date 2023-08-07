import React from 'react'
import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import About from './components/additional/About';



export default function App() {
  return <>
    <Router>
      <Routes>
        <Route path='https://moximilian.github.io/Weather_App/' element={<Main />} />
        <Route path='https://moximilian.github.io/Weather_App/about' element={<About />} />
      </Routes>
    </Router>
  </>
}


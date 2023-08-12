import React from 'react'
import './App.css';
import Main from './components/Main';
import { BrowserRouter as Router, Route, Routes, HashRouter} from 'react-router-dom'
import About from './components/additional/About';
import Here from './components/Here';




export default function App() {


  return <>
    <HashRouter>
      <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/about' element={<About />} />
          <Route path='/here' element={<Here />} />
      </Routes>
    </HashRouter>
  </>
}


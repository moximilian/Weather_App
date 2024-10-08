import './App.css'
import { BrowserRouter as Router, Route, Routes, HashRouter } from 'react-router-dom'
import MainPage from './pages/MainPage'
import AboutPage from './pages/AboutPage'
import FindMePage from './pages/FindMePage'
export default function App() {
    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/findme" element={<FindMePage />} />
                </Routes>
            </HashRouter>
        </>
    )
}

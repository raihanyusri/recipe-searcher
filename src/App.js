import React from 'react'
import Home from './views/Home';
import Signup from './views/Signup';
import Login from './views/Login';
import Favourites from './views/Favourites';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/favourites" element={<Favourites />} />
                </Routes>
            </div>
        </Router>
    )
}

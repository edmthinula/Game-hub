import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Component that displays the list of games
import GameDetail from './pages/Gamedetails'; // Component that shows game details

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/game/:id" element={<GameDetail/>} />
      </Routes>
    </Router>
  );
}

export default App;

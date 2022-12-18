import React from 'react';
import { Route, Routes } from "react-router-dom";
import './styles/style.scss';
import { ChatRoom, Login } from './pages'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat-room" element={<ChatRoom />} />
    </Routes>


  );
}

export default App;

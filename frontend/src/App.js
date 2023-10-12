import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import StudentHomePage from './pages/StudentHomePage';

function App() 
{
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<LoginPage />} />
            <Route path="/studenthomepage" index element={<StudentHomePage />} />
          </Routes>
       </BrowserRouter>
      </header>
    </div>
  );
}

export default App;

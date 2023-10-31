import React from 'react';
import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import OrgPortalPage from './pages/OrgPortalPage';
import StudentHomePage from './pages/StudentHomePage';
import StudentHomePage from './pages/StudentHomePage';

function App() 
{
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<LoginPage />} />
            <Route path="/orgportal" element={<OrgPortalPage/>}></Route>
            <Route path="/studenthomepage" index element={<StudentHomePage />} />
          </Routes>
          <Routes>
            <Route path="/studenthomepage" element={<StudentHomePage/>}></Route>
          </Routes>
       </Router>
      </header>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import "@fontsource/league-spartan";
import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import OrgPortalPage from './pages/OrgPortalPage';
import LandingPage from './pages/LandingPage';

function App() 
{
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage/>}></Route>
          </Routes>
          <Routes>
            <Route path="/orgportal" element={<OrgPortalPage/>}></Route>
          </Routes>
          <Routes>
            <Route path="/LandingPage" element={<LandingPage/>}></Route>
          </Routes>
       </Router>
      </header>
    </div>
  );
}

export default App;

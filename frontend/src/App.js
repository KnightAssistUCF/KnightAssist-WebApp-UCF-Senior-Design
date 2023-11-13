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
import StudentHomePage from './pages/StudentHomePage';
import StudentExplorePage from './pages/StudentExplorePage';
import EmailVerifiedPage from './pages/EmailVerifiedPage';

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
            <Route path="/studenthomepage" element={<StudentHomePage/>}></Route>
          </Routes>
          <Routes>
            <Route path="/explore" element={<StudentExplorePage/>}></Route>
          </Routes>
          <Routes>
            <Route path="/emailverified" element={<EmailVerifiedPage/>}></Route>
          </Routes>
       </Router>
      </header>
    </div>
  );
}

export default App;
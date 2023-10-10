import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import OrgPortalPage from './pages/OrgPortalPage';

function App() 
{
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage/>}></Route>
          </Routes>
       </Router>
      </header>
    </div>
  );
}

export default App;

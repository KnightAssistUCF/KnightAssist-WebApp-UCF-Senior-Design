import React from 'react';
import './App.css';

import LoginPage from './pages/LoginPage';
import OrgPortalPage from './pages/OrgPortalPage';

function App() 
{
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1> Knight Assist </h1> */}
        <OrgPortalPage />
      </header>
    </div>
  );
}

export default App;

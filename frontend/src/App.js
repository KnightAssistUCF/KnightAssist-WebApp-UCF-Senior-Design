import React from 'react';
import './App.css';

import LoginPage from './pages/LoginPage';

function App() 
{
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1> Knight Assist </h1> */}
        <LoginPage />
      </header>
    </div>
  );
}

export default App;

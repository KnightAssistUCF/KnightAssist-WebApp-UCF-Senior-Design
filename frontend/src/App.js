import React from 'react';
import './App.css';
import "@fontsource/league-spartan";
import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import OrgEventsPage from './pages/OrgEventsPage';
import LandingPage from './pages/LandingPage';
import StudentHomePage from './pages/StudentHomePage';
import StudentExplorePage from './pages/StudentExplorePage';
import EmailVerifiedPage from './pages/EmailVerifiedPage';
import StudentProfile from './components/StudentProfile/StudentProfile';
import PostVerificationQuestionsPage from './pages/PostVerificationQuestionsPage';
import OrgHomePage from './pages/OrgHomePage';

function App() 
{
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage/>}></Route>
          </Routes>
          <Routes>
            <Route path="/login" element={<LoginPage/>}></Route>
          </Routes>
		  <Routes>
            <Route path="/orghome" element={<OrgHomePage/>}></Route>
          </Routes>
          <Routes>
            <Route path="/orgevents" element={<OrgEventsPage/>}></Route>
          </Routes>
          <Routes>
            <Route path="/studenthomepage" element={<StudentHomePage/>}></Route>
          </Routes>
          <Routes>
            <Route path="/explore" element={<StudentExplorePage/>}></Route>
          </Routes>
          <Routes>
            <Route path="/studentprofile" element={<StudentProfile/>}></Route>
          </Routes>
          <Routes>
            <Route path="/emailverified" element={<EmailVerifiedPage/>}></Route>
          </Routes>
          <Routes>
            <Route path="/postverifyquestions" element={<PostVerificationQuestionsPage/>}></Route>
          </Routes>
       </Router>
      </header>
    </div>
  );
}

export default App;
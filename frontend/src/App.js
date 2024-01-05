import React, { useState, useEffect } from 'react';
import './App.css';
import "@fontsource/league-spartan";
import {
  HashRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import LoginPage from './pages/LoginPage';
import OrgEventsPage from './pages/OrgEventsPage';
import LandingPage from './pages/LandingPage';
import StudentHomePage from './pages/StudentHomePage';
import StudentExplorePage from './pages/StudentExplorePage';
import StudentEmailVerified from './pages/StudentEmailVerifiedPage';
import OrganizationEmailVerified from './pages/OrganizationEmailVerifiedPage';
import StudentProfile from './components/StudentProfile/StudentProfile';
import PostVerificationQuestionsPage from './pages/PostVerificationQuestionsPage';
import OrgHomePage from './pages/OrgHomePage';
import StudentHistory from './components/StudentHistory/StudentHistory';
import NewAnnPage from './pages/NewAnnPage';
import AboutUsPage from './pages/AboutUsPage';

function App() 
{
	const [role, setRole] = useState((sessionStorage.getItem("token") !== null) ? sessionStorage.getItem("role") : "");

	useEffect(() => {
		if(sessionStorage.getItem("token") === null)
			setRole("");
	}, []);

	return (
		<div className="App">
		<header className="App-header">
			<Router>
			<Routes>
				<Route path="/" element={<LandingPage/>}></Route>
			</Routes>
			<Routes>
				<Route path="/login" element={<LoginPage setRole={setRole}/>}></Route>
			</Routes>
			<Routes>
				<Route path="/orghome" element={(role === "organization") ? <OrgHomePage/> : <Navigate from='/orghome' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/orgevents" element={(role === "organization") ? <OrgEventsPage/> : <Navigate from='/orgevents' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/studenthomepage" element={(role === "volunteer") ? <StudentHomePage/> : <Navigate from='/studenthomepage' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/explore" element={(role === "volunteer") ? <StudentExplorePage/> : <Navigate from='/explore' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/studentprofile" element={(role === "volunteer") ? <StudentProfile/> : <Navigate from='/studentprofile' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/studenthistory" element={(role === "volunteer") ? <StudentHistory/> : <Navigate from='/studenthistory' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/studentemailverified" element={<StudentEmailVerified/>}></Route>
			</Routes>
			<Routes>
				<Route path="/organizationemailverified" element={<OrganizationEmailVerified/>}></Route>
			</Routes>
			<Routes>
				<Route path="/postverifyquestions" element={(role !== "") ? <PostVerificationQuestionsPage/> : <Navigate from='/postverifyquestions' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/studentannouncements" element={(role === "volunteer") ? <NewAnnPage/> : <Navigate from='/studentannouncements' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/about" element={<AboutUsPage/>}></Route>
			</Routes>
		</Router>
		</header>
		</div>
	);
}

export default App;
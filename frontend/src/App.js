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
	const [loggedIn, setIsLoggedIn] = useState(sessionStorage.getItem("token") !== null);

	useEffect(() => {
		if(sessionStorage.getItem("token") === null)
			setIsLoggedIn(false);
	}, []);

	return (
		<div className="App">
		<header className="App-header">
			<Router>
			<Routes>
				<Route path="/" element={<LandingPage/>}></Route>
			</Routes>
			<Routes>
				<Route path="/login" element={<LoginPage markLogin={setIsLoggedIn}/>}></Route>
			</Routes>
			<Routes>
				<Route path="/orghome" element={(loggedIn) ? <OrgHomePage/> : <Navigate from='/orghome' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/orgevents" element={(loggedIn) ? <OrgEventsPage/> : <Navigate from='/orgevents' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/studenthomepage" element={(loggedIn) ? <StudentHomePage/> : <Navigate from='/studenthomepage' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/explore" element={(loggedIn) ? <StudentExplorePage/> : <Navigate from='/explore' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/studentprofile" element={(loggedIn) ? <StudentProfile/> : <Navigate from='/studentprofile' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/studenthistory" element={(loggedIn) ? <StudentHistory/> : <Navigate from='/studenthistory' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/studentemailverified" element={<StudentEmailVerified/>}></Route>
			</Routes>
			<Routes>
				<Route path="/organizationemailverified" element={<OrganizationEmailVerified/>}></Route>
			</Routes>
			<Routes>
				<Route path="/postverifyquestions" element={(loggedIn) ? <PostVerificationQuestionsPage/> : <Navigate from='/postverifyquestions' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/studentannouncements" element={(loggedIn) ? <NewAnnPage/> : <Navigate from='/studentannouncements' to='/login' />}></Route>
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
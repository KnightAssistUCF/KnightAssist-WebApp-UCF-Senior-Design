import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
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
import StudentProfilePage from './pages/StudentProfilePage';
import RedoStudentProfilePage from './pages/RedoStudentProfilePage';
import RegisterPage from './pages/RegisterPage';
import PostVerificationQuestionsPage from './pages/PostVerificationQuestionsPage';
import OrgHomePage from './pages/OrgHomePage';
import StudentHistory from './components/StudentHistory/StudentHistory';
import NewAnnPage from './pages/NewAnnPage';
import AdminHomePage from './pages/AdminHomePage';
import AboutUsPage from './pages/AboutUsPage';
import OrgFeedbackPage from './pages/OrgFeedbackPage';
import OrgProfilePage from './pages/OrgProfilePage';
import ContactPage from './pages/ContactPage';
import SettingsPage from './pages/SettingsPage';
import StudentDetailsPage from './pages/StudentDetailsPage';
import OrganizationDetailsPage from './pages/OrganizationDetailsPage';
import StudentProfile from './components/StudentProfile/StudentProfile';
import LeaderboardPage from './pages/LeaderboardPage';
import OrgAnnPage from './pages/OrgAnnPage';

function App() 
{
	const [role, setRole] = useState((sessionStorage.getItem("token") !== null) ? sessionStorage.getItem("role") : undefined);
	const [theme, setTheme] = useState((sessionStorage.getItem("theme") !== null) ? sessionStorage.getItem("theme") : undefined);

	useEffect(() => {
		if(sessionStorage.getItem("token") === null)
			setRole("");
	}, []);

	// TODO: set the theme using sessionstorage
	// create themes to handle the app's palette, including background
	const darkTheme = createTheme({
		palette: {
		  mode: 'dark',
		  background: {
            default: '#1e1e1e',
            paper: '#1e1e1e',
          },
		  primary: {
			main: '#90caf9',
		  },
		  secondary: {
			main: '#f48fb1',
		  },
		},
	  });

	  const lightTheme = createTheme({
		palette: {
		  mode: 'light',
		  primary: {
			main: '#90caf9',
		  },
		  secondary: {
			main: '#f48fb1',
		  },
		},
	  });

	return (
		<div className="App">
		

			<Router>
			<ThemeProvider theme={(theme === "dark") ? darkTheme : lightTheme}>
			<Routes>
				<Route path="/orghome" element={(role === "organization") ? <OrgHomePage/> : <Navigate from='/orghome' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/orgevents" element={(role === "organization") ? <OrgEventsPage/> : <Navigate from='/orgevents' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/orgfeedback" element={(role === "organization") ? <OrgFeedbackPage/> : <Navigate from='/orgfeedback' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/studenthomepage" element={(role === "volunteer") ? <StudentHomePage/> : <Navigate from='/studenthomepage' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/explore" element={(role === "volunteer") ? <StudentExplorePage/> : <Navigate from='/explore' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/studenthistory" element={(role === "volunteer") ? <StudentHistory/> : <Navigate from='/studenthistory' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/studentemailverified" element={<StudentEmailVerified/>}></Route>
			</Routes>
			<Routes>
				<Route path="/studentannouncements" element={(role === "volunteer") ? <NewAnnPage/> : <Navigate from='/studentannouncements' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/organnouncements" element={(role === "organization") ? <OrgAnnPage/> : <Navigate from='/organnouncements' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/organizationemailverified" element={<OrganizationEmailVerified/>}></Route>
			</Routes>
			<Routes>
				<Route path="/postverifyquestions" element={(role) ? <PostVerificationQuestionsPage/> : <Navigate from='/postverifyquestions' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/settings" element={(role) ? <SettingsPage setTheme={setTheme}/> : <Navigate from='/settings' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/leaderboard" element={(role) ? <LeaderboardPage/> : <Navigate from='/leaderboard' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/orgprofile" element={<OrgProfilePage/>}></Route>
			</Routes>
			{/* <Routes>
				<Route path="/studentprofile" element={<StudentProfilePage/>}></Route>
			</Routes> */}
			<Routes>
				<Route path="/studentprofile" element={(role) ? <RedoStudentProfilePage/> : <Navigate from='/studentprofile' to='/login' />}></Route>
			</Routes>
			<Routes>
				<Route path="/login" element={<LoginPage setRole={setRole} setTheme={setTheme}/>}></Route>
			</Routes>
			<CssBaseline />
		</ThemeProvider>
			<Routes>
				<Route path="/about" element={<AboutUsPage/>}></Route>
			</Routes>
      		<Routes>
				<Route path="/register" element={<RegisterPage/>}></Route>
			</Routes>
			<Routes>
				<Route path="/contact" element={<ContactPage/>}></Route>
			</Routes>
			<Routes>
				<Route path="/" element={<LandingPage/>}></Route>
			</Routes>
			<Routes>
				<Route path="/adminhome" element={(role === "admin") ? <AdminHomePage/> : <Navigate from='/adminhome' to='/login' />}></Route>
			</Routes>
      		<Routes>
				<Route path="/adminhome/students/:studentID" element={(role === "admin") ? <StudentDetailsPage/> : <Navigate from='/adminhome' to='/login' />}></Route>
			</Routes>
      		<Routes>
				<Route path="/adminhome/organizations/:organizationID" element={(role === "admin") ? <OrganizationDetailsPage/> : <Navigate from='/adminhome' to='/login' />}></Route>
			</Routes>
		</Router>

		</div>
	);
}

export default App;
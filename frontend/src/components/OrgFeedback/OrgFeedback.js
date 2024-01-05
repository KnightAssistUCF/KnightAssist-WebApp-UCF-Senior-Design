import React, { useState, useEffect } from 'react';
import Header from '../OrgEvents/Header';
import SearchBar from "./SearchBar.js";
import Feedbacks from "./Feedbacks.js";
import './OrgFeedback.css';
import { buildPath } from '../../path.js';

function OrgFeedback() {
	var [announcements, setAnnouncements] = useState([]);
	var [searchAnnouncement, setSearchAnnouncement] = useState([]);
	var [filterTerm, setFilterTerm] = useState("");
	var [favUpdates, setFavUpdates] = useState([]);
	var [finalFavUpdates, setFinalFavUpdates] = useState([]);

	var url2 = buildPath(`api/loadAllOrganizations`);
	const [searchTerm, setSearchTerm] = useState("");

	function Title(){
		return(
		  <div className='feedbackText spartan'>
			 <h1>Feedback</h1>
		  </div>
		)
	}

	const fetchFavoritedUpdates = async () => {
		//sessionStorage.setItem("ID", "6519e4fd7a6fa91cd257bfda");
		console.log(sessionStorage.getItem("ID"));
		const authToken = sessionStorage.getItem("token");
		url2 = buildPath(`api/loadFavoritedOrgsEvents?userID=${sessionStorage.getItem("ID")}`);
		try {
		let response = await fetch(url2, {
			method: "GET",
			headers: {"Content-Type": "application/json",
			"Authorization": `Bearer ${authToken}`
		},
		});
		let res1 = await response.json();
		var favUpdates = [];
		//var tempFavUpdates = [];
		for(let org of res1) {
			if(org.updates.length !== 0) {
			//favUpdates.push({_id: org._id, orgName: org.name, update: org.updates});
			favUpdates = favUpdates.concat(
				org.updates.map(update => ({
				organizationID: org._id,
				name: org.name,
				title: update.title,
				content: update.content,
				date: update.date,
				})));
			}
		}
		console.log(favUpdates);
		
		favUpdates = favUpdates.sort((a, b) => {
			return new Date(a.date) - new Date(b.date);
		});
		console.log(favUpdates);
		setFinalFavUpdates(favUpdates);
		setFavUpdates(favUpdates);
		} catch(e) {
		console.log("failed to fetch fav updates");
		}
	};
	

	const fetchAllUpdates = async () => {
		try {
		let response = await fetch(url2, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		let res = await response.json();

		let updatesArray = [];

		for (let org of res) {
			try {
			var url3 = buildPath(
				`api/loadAllOrgAnnouncements?organizationID=${org._id}`
			);

			response = await fetch(url3, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			let orgUpdates = await response.json();
			if (
				orgUpdates.announcements &&
				Array.isArray(orgUpdates.announcements)
			) {
				const announcementsWithOrgName = orgUpdates.announcements.map((announcement) => ({
				...announcement,
				organizationName: org.name.trim(),
				}));

				updatesArray.push(...announcementsWithOrgName);
			} else {
				console.error("Invalid response from org updates API:", orgUpdates);
			}
			} catch (e) {
			console.error("Failed to fetch org updates:", e);
			}
		}
		//updatesArray.reverse();
		updatesArray.sort((a, b) => new Date(b.date) - new Date(a.date));

		setAnnouncements(updatesArray);
		setSearchAnnouncement(updatesArray);
		} catch (e) {
		console.error("API call failed:", e);
		}
	};

	const searchAnnouncements = (searchTerm) => {
		console.log(filterTerm);
	
		if (filterTerm !== "") {
		console.log("HEREE-------------------");
		const lowerCaseSearchTerm = searchTerm.toLowerCase();
	
		const filteredResults = searchAnnouncement.filter((a) => {
			const title = a.title ? a.title.toLowerCase() : "";
			const organizationName = a.organizationName
			? a.organizationName.toLowerCase()
			: "";
	
			const includesSearchTerm =
			title.includes(lowerCaseSearchTerm) ||
			organizationName.includes(lowerCaseSearchTerm);
	
			return includesSearchTerm;
		});
		setSearchAnnouncement(filteredResults);
		} else {
		const lowerCaseSearchTerm = searchTerm.toLowerCase();
	
		const filteredResults = announcements.filter((a) => {
			const title = a.title ? a.title.toLowerCase() : "";
			const organizationName = a.organizationName
			? a.organizationName.toLowerCase()
			: "";
	
			const includesSearchTerm =
			title.includes(lowerCaseSearchTerm) ||
			organizationName.includes(lowerCaseSearchTerm);
	
			return includesSearchTerm;
		});
	
		setSearchAnnouncement(filteredResults);
		}
	};

	const filterAnnouncements = (filterTerm) => {

		const term = filterTerm.toLowerCase();
		setFilterTerm(term);

		let filteredAnnouncements = [...announcements];

		if (term !== "") {
		if (term === "favorited") {
			console.log("favorited!!!");

			filteredAnnouncements = favUpdates.map(update => ({
			...update,
			organizationName: update.name,
			}));
			setSearchAnnouncement(filteredAnnouncements.reverse());
		} else {
			filteredAnnouncements = filteredAnnouncements.filter((a) =>
			a.title && a.title.toLowerCase().includes(term)
			);
			setSearchAnnouncement(filteredAnnouncements);
		}
		} else {
		console.log("All!!!");
		setSearchAnnouncement(filteredAnnouncements);
		}

		
	};
	
	useEffect(() => {
		fetchAllUpdates();
		fetchFavoritedUpdates();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Header/>
			<div className='moveEverything'>
				<Title/>
				<div className="announcementSection">
					<div className="topSection">
						<SearchBar
							searchAnnouncements={searchAnnouncements}
							setSearchTerm={setSearchTerm}
							searchTerm={searchTerm}
							filterTerm={filterTerm}
							setFilterTerm={setFilterTerm}
							fetchAllUpdates={fetchAllUpdates}
							finalFavUpdates = {finalFavUpdates}
							setSearchAnnouncement={setSearchAnnouncement}
							initialAnnouncements={announcements}
						/>
					</div>
				<Feedbacks announcements={searchAnnouncement} />
			</div>
			</div>
		</div>
	);
}

export default OrgFeedback;


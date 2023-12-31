import React, { useState, useEffect } from 'react';
import Header from '../OrgEvents/Header';
import SearchBar from "./SearchBar.js";
import Feedbacks from "./Feedbacks.js";
import './OrgFeedback.css';
import { buildPath } from '../../path.js';
import Filter from './Filter.js';

function OrgFeedback() {
	var [feedback, setFeedback] = useState([]);
	var [searchFeedback, setSearchFeedback] = useState([]);
	var [filterTerm, setFilterTerm] = useState("all");

	const [searchTerm, setSearchTerm] = useState("");

	function Title(){
		return(
		  <div className='feedbackText spartan'>
			 <h1>Feedback</h1>
		  </div>
		)
	}

	const fetchAllFeedback = async () => {
		try {
			// Will be changed to local storage
			const url = buildPath(`api/retrieveAllFeedback_ForAnOrg?orgId=${"6530608eae2eedf04961794e"}`);

			let response = await fetch(url, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
			});

			let res = JSON.parse(await response.text());

			console.log(res)

			res.sort((a, b) => new Date(b.timeFeedbackSubmitted) - new Date(a.timeFeedbackSubmitted));

			setFeedback(res);
			setSearchFeedback(res);
		} catch (e) {
			console.error("API call failed:", e);
		}
	};

	const getSeachFeedback = (searchTerm) => {
		console.log(filterTerm);
	
		if (filterTerm === "unread") {
			const lowerCaseSearchTerm = searchTerm.toLowerCase();
		
			const filteredResults = searchFeedback.filter((a) => {
				const title = a.eventName ? a.eventName.toLowerCase() : "";

				const includesSearchTerm = title.includes(lowerCaseSearchTerm) 
		
				return includesSearchTerm;
			});

			setSearchFeedback(filteredResults);
		} else {
			const lowerCaseSearchTerm = searchTerm.toLowerCase();
		
			const filteredResults = feedback.filter((a) => {
				const title = a.eventName ? a.eventName.toLowerCase() : "";

				const includesSearchTerm = title.includes(lowerCaseSearchTerm);
		
				return includesSearchTerm;
			});
		
			setSearchFeedback(filteredResults);
		}
	};

	const filterFeedback = (filterTerm) => {

		const term = filterTerm.toLowerCase();
		setFilterTerm(term);

		if (term === "unread") {
			const unreads = [];
			for(let f of feedback)
				if(f.wasReadByUser === false)
					unreads.push(f);

			setSearchFeedback(unreads);
		}else{
			setSearchFeedback(feedback)
		}
	};

	useEffect(() => {
		fetchAllFeedback();
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
							searchAnnouncements={getSeachFeedback}
							setSearchTerm={setSearchTerm}
							searchTerm={searchTerm}
							filterTerm={filterTerm}
							setFilterTerm={setFilterTerm}
							fetchAllUpdates={fetchAllFeedback}
							setSearchAnnouncement={setSearchFeedback}
							initialAnnouncements={feedback}
						/>
						<Filter filterFeedback={filterFeedback} filterTerm={filterTerm}/>
					</div>
				<Feedbacks feedback={searchFeedback}/>
			</div>
			</div>
		</div>
	);
}

export default OrgFeedback;


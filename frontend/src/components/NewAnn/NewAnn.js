import React, { useState, useEffect } from 'react';
import StudentHeader from '../StudentHeader.js';
import '../Header.css';
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Announcements from "./Announcements";
import './Announcements.css';
import { buildPath } from '../../path';



// ... (import statements)

function NewAnn() {
  const [announcements, setAnnouncements] = useState([]);
  const [searchAnnouncement, setSearchAnnouncement] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all"); // Default to "all"

  // Inside NewAnn component
const reverseSearchResults = () => {
  setSearchAnnouncement((prevResults) => [...prevResults].reverse());
};


  var url2 = buildPath(`api/loadAllOrganizations`);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFavoritedUpdates = async () => {
    const userID = "6519e4fd7a6fa91cd257bfda"; // John Doe
    url2 = buildPath(`api/loadFavoritedOrgsEvents?userID=${userID}`);
    const favOrgs = [];
    try {
      let response = await fetch(url2, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      let res1 = await response.json();
      for(let org of res1) {
        if(org.updates.length != 0) {
          console.log(org.updates);
          favOrgs.push({_id: org._id, orgName: org.name, update: org.updates});
        }
        
        console.log(favOrgs);

      }
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
      updatesArray.reverse();

      setAnnouncements(updatesArray);
      setSearchAnnouncement(updatesArray);
    } catch (e) {
      console.error("API call failed:", e);
    }
  };

  const searchAnnouncements = (searchTerm) => {
    console.log(searchTerm);
    let filteredResults = [...announcements];
  

  
    console.log("Filtered Results:", filteredResults);
  
    const searchResults = filteredResults.filter((a) => {
      const title = a.title ? a.title.toLowerCase() : '';
      const organizationName = a.organizationName ? a.organizationName.toLowerCase() : '';
  
      const includesSearchTerm =
        title.includes(searchTerm.toLowerCase()) ||
        organizationName.includes(searchTerm.toLowerCase());
  
      return includesSearchTerm;
    });
    const reversedSearchResults = [...searchResults].reverse();

    console.log("Search Results:", reversedSearchResults);
    
    setSearchAnnouncement(reversedSearchResults);
  
  };
  
  
  
  

  const filterAnnouncements = (filterTerm) => {
    console.log('Filter Term:', filterTerm);
  
    // If filterTerm is undefined, set an empty string
    const term = filterTerm || "";
  
    setFilterTerm(term);
  
    // Filter announcements based on the term
    var filteredAnnouncements = [...announcements];
  
    if (term !== "") {
      filteredAnnouncements = filteredAnnouncements.filter((a) =>
        a.title && a.title.includes(term)
      );
    }
  
    setSearchAnnouncement(filteredAnnouncements);
  };
  
  

  // New function to handle organization name filtering


  useEffect(() => {
    fetchAllUpdates();
    fetchFavoritedUpdates();
  }, []);

  return (
    <div id="studentAnnouncements">
      <div className="studentAnnouncements">
        <div className={"testing"}>
          <SearchBar
            searchAnnouncements={searchAnnouncements}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            filterTerm={filterTerm}
            setFilterTerm={setFilterTerm} // Pass setFilterTerm to SearchBar
            reverseSearchResults={reverseSearchResults}
            fetchAllUpdates={fetchAllUpdates}
          />
          <Filter
            filterAnnouncements={filterAnnouncements}
          />
        </div>
        <Announcements announcements={searchAnnouncement} />
      </div>
    </div>
  );
}

export default NewAnn;

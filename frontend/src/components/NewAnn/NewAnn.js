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
  const [organizationFilter, setOrganizationFilter] = useState(""); // New state for organization name
  const url2 = buildPath(`api/loadAllOrganizations`);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFavoritedUpdates = async () => {
    try {

    } catch(e) {

    }
  }

  const fetchAllUpdates = async () => {
    try {
      let response = await fetch(url2, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      let res = await response.json();
      console.log(res);

      let updatesArray = [];

      for (let org of res) {
        console.log(org._id);
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
    let filteredResults = [...announcements];
  
    // Additional filter based on organization name
    if (organizationFilter) {
      filteredResults = filteredResults.filter(
        (a) =>
          a.organizationName.toLowerCase().trim() ===
          organizationFilter.toLowerCase().trim()
      );
    }
  
    console.log("Organization Filter:", organizationFilter);
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
  const filterByOrganization = (organizationName) => {
    setOrganizationFilter(organizationName);
  };

  useEffect(() => {
    fetchAllUpdates();
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
          />
          <Filter
            filterAnnouncements={filterAnnouncements}
            filterByOrganization={filterByOrganization}
          />
        </div>
        <Announcements announcements={searchAnnouncement} />
      </div>
    </div>
  );
}

export default NewAnn;


import React, { useState, useEffect } from 'react';
import StudentHeader from '../StudentHeader.js';
import '../Header.css';
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import Announcements from "./Announcements";
import './Announcements.css';
import { buildPath } from '../../path';



function NewAnn() {
    const [announcements, setAnnouncements] = useState([]);
    const [searchAnnouncement, setSearchAnnouncement] = useState([]);
    const [filterTerm, setFilterTerm] = useState("");
    const url = "https://restcountries.com/v2/all";
    const url2 = buildPath(`api/loadAllOrganizations`);
    const [searchTerm, setSearchTerm] = useState("");

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
    
            // Check if orgUpdates has the "announcements" property
            if (orgUpdates.announcements && Array.isArray(orgUpdates.announcements)) {
              updatesArray.push(...orgUpdates.announcements);
            } else {
              console.error("Invalid response from org updates API:", orgUpdates);
            }
          } catch (e) {
            console.error("Failed to fetch org updates:", e);
          }
        }
        console.log(updatesArray);
    
        setAnnouncements(updatesArray);
        setSearchAnnouncement(updatesArray);
      } catch (e) {
        console.error("API call failed:", e);
      }
    };
    
    
  
  
  


    // const fetchCountryData = async () => {
    //     const response = await fetch(url);
    //     const announcements = await response.json();
    //     setAnnouncements(announcements);
    //     setSearchAnnouncement(announcements);
    //   };




    const searchAnnouncements = (searchTerm) => {
      let filteredResults = [...announcements];
    
      if (filterTerm) {
        // Apply filter if one is selected
        filteredResults = filteredResults.filter((a) =>
          a.region.toLowerCase().includes(filterTerm.toLowerCase())
        );
      }
    
      const searchResults = filteredResults.filter((a) => {
        // Assuming your announcement structure has properties like title, content, and region
        const title = a.title ? a.title.toLowerCase() : '';
        const content = a.content ? a.content.toLowerCase() : '';
    
        const includesSearchTerm =
          title.includes(searchTerm.toLowerCase()) ||
          content.includes(searchTerm.toLowerCase());
    
        return includesSearchTerm;
      });
    
      setSearchAnnouncement(searchResults);
    };
    
      
      

      const filterAnnouncements = (filterTerm) => {
        console.log('Filter Term:', filterTerm); // Check if filterTerm is updated
        setFilterTerm(filterTerm);
        var filter = [...announcements];
        filter = filter.filter((a) => a.region.includes(filterTerm));
        setSearchAnnouncement(filter);
      };
      
      useEffect(() => {
        //fetchCountryData();
        fetchAllUpdates();
      }, []);




    return (
        <div id='studentAnnouncements'>
            <div className="studentAnnouncements">
                <div className={"testing"}>
                    <SearchBar             
                        searchAnnouncements={searchAnnouncements}
                        setSearchTerm={setSearchTerm}
                        searchTerm={searchTerm}
                        filterTerm={filterTerm} 
                    />
                    <Filter filterAnnouncements={filterAnnouncements} />
                </div>
                <Announcements announcements={searchAnnouncement} />
            </div>
        </div>
    );
}

export default NewAnn;

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
                headers: {"Content-Type": "application/json"},
            });

            let res = JSON.parse(await response.text());
            console.log(res);

            for(let org of res) {
                try {
                    url = buildPath(`api/loadAllOrgAnnouncements?organizationID=${org.organizationID}`);

                    response = await fetch(url, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                    });
                
                    let orgUpdates = JSON.parse(await response.text());
                    console.log(orgUpdates);
                } catch(e) {

                }
            }
            
        } catch(e) {

        }
    }


    const fetchCountryData = async () => {
        const response = await fetch(url);
        const announcements = await response.json();
        setAnnouncements(announcements);
        setSearchAnnouncement(announcements);
      };




      const searchAnnouncements = (searchTerm) => {
        let filteredResults = [...announcements];
      
        if (filterTerm) {
          // Apply filter if one is selected
          filteredResults = filteredResults.filter((a) =>
            a.region.toLowerCase().includes(filterTerm.toLowerCase())
          );
        }
      
        const searchResults = filteredResults.filter((a) => {
          const b = a.name.toLowerCase().includes(searchTerm.toLowerCase());
          const c = a.population
            .toString()
            .includes(searchTerm.toLowerCase().replaceAll(",", ""));
          const d = a.region.toLowerCase().includes(searchTerm.toLowerCase());
      
          return b || c || d;
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
        fetchCountryData();
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

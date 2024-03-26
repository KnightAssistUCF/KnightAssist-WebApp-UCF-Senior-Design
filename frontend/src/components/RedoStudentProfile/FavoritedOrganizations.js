import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RedoStudentProfile.css';
import { buildPath } from '../../path';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Avatar, Box } from '@mui/material';
import '../OrgEvents/OrgEvents.css'
import Pagination from '@mui/material/Pagination';

function FavoritedOrganizations() {
    const [favoritedOrgs, setFavoritedOrgs] = useState([]);
    const [orgs, setOrgs] = useState([]);
    const [orgCards, setOrgCards] = useState();
    const [numPages, setNumPages] = useState(0);  
    const [page, setPage] = useState(1);
	const [orgsPerPage, setOrgsPerPage] = useState(getInitialPerPage());
	
	// Bug purposes
	const [initiateListener, setInitiateListener] = useState(1);

	function getInitialPerPage(){
		const width = window.innerWidth;

		if(width > 1500){
			return 3;
		}else if(width > 900){
			return 2;
		}else{
			return 1;
		}
	}

	function changePage(e, value, perPage = orgsPerPage){
		setPage(value);
		let content = <div className="cards d-flex flex-row cardWhite card-body-profile">{orgs.slice(perPage * (value - 1), perPage * (value - 1) + perPage)}</div>
		setOrgCards(content);
	}

    // Will open the organization's page
    function openOrgPage(id){
		sessionStorage.setItem("viewingPageID", id);
		window.location.href="/#/orgprofile";
    }

    async function fetchFavoritedOrganizations() {
        try {
            let studentID = sessionStorage.getItem("ID");

            let url = buildPath(`api/loadFavoritedOrgs?userID=${studentID}`);

            let response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            let res = JSON.parse(await response.text());

            console.log(res);
            // setFavoritedOrgs(res);

            let orgList = [];
            for(let org of res) {
                url = buildPath(`api/retrieveImage?typeOfImage=2&id=${org._id}`);

                response = await fetch(url, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });
        
                let profilePic = JSON.parse(await response.text());
    
                // Gets background pic of org
                url = buildPath(`api/retrieveImage?typeOfImage=4&id=${org._id}`);
    
                response = await fetch(url, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });

                let backgroundPic = JSON.parse(await response.text());

                org.profilePic = profilePic;
                org.backgroundPic = backgroundPic;

                orgList.push(org);
            }
            console.log(orgList);
            setFavoritedOrgs(orgList);
            setNumPages(Math.ceil(orgList.length / orgsPerPage))
    
            setInitiateListener(initiateListener * -1);
    
            let extraBack = 0;
            
            // Need to go a page back due to deletion
            if(((page - 1) * orgsPerPage) >= orgList.length){
                setPage(page - 1);
                extraBack = 1;
            }
        } catch (e) {
            console.log("Failed to get favorited orgs");
        }
    }

    function openOrgPage(orgId) {
        console.log("Clicked organization id:", orgId);
        // Add your logic to navigate to the organization page
    }

    useEffect(() => {
        fetchFavoritedOrganizations();
    }, []);

    useEffect(()=>{
		const adjustForSize = () => {
			if(!orgCards) return;
			const width = window.innerWidth;
			
			const oldOrgsPerPage = orgsPerPage;

			if(width > 1500){
				setOrgsPerPage(3);
				setNumPages(Math.ceil(orgs.length / 3))
				changePage(null, Math.ceil((((page - 1) * oldOrgsPerPage) + 1) / 3), 3);
			}else if(width > 900){
				setOrgsPerPage(2);
				setNumPages(Math.ceil(orgs.length / 2))
				changePage(null, Math.ceil((((page - 1) * oldOrgsPerPage) + 1) / 2), 2);
			}else{
				setOrgsPerPage(1);
				setNumPages(orgs.length)
				changePage(null, Math.ceil((((page - 1) * oldOrgsPerPage) + 1) / 1), 1);
			}
		}

		window.addEventListener("resize", adjustForSize);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[initiateListener])

    return (
        <div className='studentFavoritedOrganizationsTab'>
                {favoritedOrgs.map((org) => (
                    <div className="event spartan">
                        <CardActionArea className='test' onClick={() => openOrgPage(org._id)}>
                            <Card sx={{maxWidth: '275px', minWidth: '275px'}} className="eventHeight">
                                <div className='logoandbg'>
                                    <CardMedia
                                        component="img"
                                        className='cardBg'
                                        height="125"
                                        image={org.backgroundPic.url}
                                    />
                                    <Avatar
                                        className='cardLogo'
                                        src={org.profilePic.url}
                                        sx={{ zIndex: 2, position: "absolute", width: 100, height: 100, marginTop: -7, borderStyle: "solid", borderColor: "white" }}
                                    />
                                </div>
                                <CardContent>
                                    <Typography className='eventName' gutterBottom variant="h6" component="div">
                                        {org.name}
                                    </Typography>
                                    <Typography>
                                        {(org.description.length >= 80) ? (org.description.substring(0, 80) + "...") : org.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </CardActionArea>
                    </div>
                ))}
                <Box my={2} display="flex" justifyContent="center">
                    <Pagination className="explorePagination" page={page} count={numPages} onChange={changePage} shape="rounded" />
                </Box>
        </div>
    );
};

export default FavoritedOrganizations;

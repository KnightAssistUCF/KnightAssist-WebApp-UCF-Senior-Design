import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './RedoStudentProfile.css';
import { buildPath } from '../../path';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Avatar } from '@mui/material';
import '../OrgEvents/OrgEvents.css'

function FavoritedOrganizations() {
    const [favoritedOrgs, setFavoritedOrgs] = useState([]);

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

    return (
        <div className='studentFavoritedOrganizationsTab'>
            <Grid container spacing={2}>
                {favoritedOrgs.map((org) => (
                    <Grid item xs={4} key={org._id}>
                        <CardActionArea className='test' onClick={() => openOrgPage(org._id)}>
                            <Card className="eventHeight">
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
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default FavoritedOrganizations;

import {useState, useEffect} from 'react';
import { buildPath } from '../../path';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Avatar from '@mui/material/Avatar';
import '../OrgEvents/OrgEvents';

const logo = require("../Login/loginPic.png");


function FavoriteOrganizations(props)
{

    const [orgs, setOrgs] = useState([]);
    const [orgCards, setOrgCards] = useState();
    const [numPages, setNumPages] = useState(0);  
    const [page, setPage] = useState(1);

    function changePage(e, value){
        setPage(value);
        let content = <div className="cards d-flex flex-row cardWhite card-body">{orgs.slice(4 * (value - 1), 4 * (value - 1) + 4)}</div>
        setOrgCards(content);
    }

    // Will open the organization's page
    function openOrgPage(id){
        
    }

    async function getOrgs(){
        let url = buildPath(`api/loadFavoritedOrgsEvents?userID=${localStorage.getItem("ID")}`);

        let response = await fetch(url, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });

        let res = JSON.parse(await response.text());

	    console.log(res);

        for(let org of res){
			url = buildPath(`api/retrieveImage?entityType=organization&id=${org._id}`);

			response = await fetch(url, {
				method: "GET",
				headers: {"Content-Type": "application/json"},
			});
	
			let pic = await response.blob();

            orgs.push(<Org name={org.name} pic={pic} description={org.description} id={org._id}/>) 
		}

        setNumPages(Math.ceil(orgs.length / 4))
        setOrgs(orgs);

        let extraBack = 0;
        
        // Need to go a page back due to deletion
        if(((page - 1) * 4) >= orgs.length){
            setPage(page - 1);
            extraBack = 1;
        }

        let content = <div className="cards d-flex flex-row cardWhite card-body">{orgs.slice((page - 1 - extraBack) * 4, (page - 1 - extraBack) * 4 + 4)}</div>
        setOrgCards(content);
    }

    function FavoriteHeader(){
        return <h1 className='favHeader spartan'>Favorite Organizations</h1>
    }

    function Org(props) {      
        return (
            <div className="event spartan">
                <CardActionArea className='test'>
                    <Card className="eventHeight" onClick={() => openOrgPage(props.id)}>
						<div className='logoandbg'>
							<CardMedia
								component="img"
								className='cardBg'
								height="125"
								image={URL.createObjectURL(props.pic)}
							/>
							<Avatar
								className='cardLogo'
                              	src={logo}
								sx={{zIndex: 2, position: "absolute", width: 100, height: 100, marginTop: -7, borderStyle: "solid", borderColor: "white"}}
                           />
						</div>
                        <CardContent>
                            <Typography className='eventName' clagutterBottom variant="h6" component="div">
                                {props.name}
                            </Typography>
                            <Typography>
                                {(props.description.length >= 80) ? (props.description.substring(0, 80) + "...") : props.description}
                            </Typography>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </div>
        )
    }

    function Orgs(){
        return (
            <div className="eventsCard card">       
                {orgCards}
            </div>
        )
    }

    useEffect(()=>{
        getOrgs();
    },[])

    return(
     <div className='upcomingEventsSpace'>
        <FavoriteHeader/>
        <div>
            <Orgs/>            
            <Pagination className="pagination" page={page} count={numPages} onChange={changePage} color="secondary" />
        </div>
     </div>
    );
};

export default FavoriteOrganizations;
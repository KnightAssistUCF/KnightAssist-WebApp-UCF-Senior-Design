import {useState, useEffect} from 'react';

import { buildPath } from '../../../../path.js';

function OrganizationDetails({ organizationID })
{
    const [name, setname] = useState('');

    const fetchOrgInfo = async () => {
        console.log(organizationID);
        try {
            let url = buildPath(`api/organizationSearch?organizationID=${organizationID}`);

            let response = await fetch(url, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
            });
        
            let res = JSON.parse(await response.text());
    
            console.log(res);
            
            setname(res.name);

        } catch(e) {
            console.log("failed to fetch student info: "+ e);
        }
    }


    useEffect(() => {
        fetchOrgInfo();
      }, []);

    return(
      <div>
        {name}
      </div>
    );
};

export default OrganizationDetails;
import { useState, useEffect } from 'react';
import './OrgHome.css';
import { buildPath } from '../../path';

function Analytics() {
  const [openAnnouncement, setOpenAnnouncement] = useState(false);

  const fetchHomeAnalytics = async () => {
    try {
        let url = buildPath(`attendanceAnalytics?orgId=${"6530608eae2eedf04961794e"}`);

      let response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      console.log("Response status code:", response.status);
  
      if (response.ok) {
        const contentType = response.headers.get("Content-Type");
        if (contentType.startsWith("image/")) {
          const imageBlob = await response.blob();
          console.log("Image response:", imageBlob);
        } else {
          const res = await response.json();
          console.log("JSON response:", res);
        }
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (e) {
      console.log("Analytics call failed:", e);
    }
  };
  
  

  useEffect(() => {
    fetchHomeAnalytics();
  }, []);


  return (
    <div>

    </div>
  );
}

export default Analytics;

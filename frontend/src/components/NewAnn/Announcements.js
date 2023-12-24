import React from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Announcements = (props) => {
  console.log(props.announcements);
  
  return (
    <div className="ann">
      <Grid
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        {props.announcements.map((announcement) => {
          const { updateID, title, organizationName, content1, content2 } = announcement;

          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={updateID}>
              <Card variant="outlined">
                <CardActionArea>
                  <CardContent className="content">
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      className={"title"}
                    >
                      {title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Announcement ID: {updateID}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Organization: {organizationName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {content1}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {content2}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Announcements;

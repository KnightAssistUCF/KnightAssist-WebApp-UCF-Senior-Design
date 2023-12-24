import React from "react";
import Card from "@mui/material//Card";
import { Grid } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";


// ... (import statements)

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
          const { updateID, title, content1, content2 } = announcement;

          return (
            <Grid item xs={13} sm={8} md={8} key={updateID}>
              {/* Add key={_id} to the outermost element */}
              <Card variant="outlined">
                <CardActionArea>
                  <CardContent className="content">
                    <Typography
                      gutterBottom
                      variant="h5"
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


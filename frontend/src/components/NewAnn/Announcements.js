import React from "react";
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Announcements = (props) => {
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
          const { updateID, title, content, date, organizationName } =
            announcement;

          return (
            <Grid item xs={8}key={updateID}>
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
                      {organizationName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {date}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {content}
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


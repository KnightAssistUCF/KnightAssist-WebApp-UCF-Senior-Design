import React from "react";
import Card from "@mui/material//Card";
import { Grid } from "@mui/material";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";


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
          const {
            numericCode,
            flag,
            name,
            population,
            region,
            capital,
            alpha3Code
          } = announcement;

          return (
            <Grid item xs={12} sm={6} md={3} key={numericCode}>
              <NavLink className="nav" to={`/${alpha3Code}`}>
                <Card>
                  <CardActionArea>
                    <CardMedia className="media" image={flag} />
                    <CardContent className="content">
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="h2"
                        className={"title"}
                      >
                        {name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Population: {population}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Region: {region}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Capital: {capital}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions></CardActions>
                </Card>
              </NavLink>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Announcements;

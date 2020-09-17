import React from "react";
import PropTypes from "prop-types";
import MovieCard from "../MovieCard/MovieCard";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
  actorMovie: {
    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4, 2, 2, 2),
    },
  },
}));


function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

const Genre = (props) => {
  const classes = useStyles();
  const { genre } = props;
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant={mobile ? "h4" : "h1"}>{capitalize(genre.name)}</Typography>
        </Grid>
      </Grid>
      <Paper className={classes.actorMovie} elevation={0}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant={mobile ? "subtitle1" : "h4"}>
              Movies
            </Typography>
          </Grid>
          {genre.movies.map((item, index) => (
            <Grid item xs={6} sm={3} xl={2} key={index}>
              <MovieCard
                changeBody={props.changeBody}
                image={item.image}
                movie={item.name}
                key={index}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Paper>
  );
};

Genre.propsType = {
  genre: PropTypes.object,
  changeBody: PropTypes.func,
  menuDrawerOpen: PropTypes.bool,
};

Genre.defaultProps = {
  genre: {
    name: "Drama",
    movies: [
      {
        name: "Pashupati Prasad",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/9jNJm1zEWXMpdhMTOwbGgiQnOpO.jpg",
      },
      {
        name: "White Sun",
        image:
          "https://image.tmdb.org/t/p/w220_and_h330_face/5XUuWAWwjb4OUgB3r8holAZzc7r.jpg",
      },
      {
        name: "Chhadke",
        image:
          "https://image.tmdb.org/t/p/w220_and_h330_face/hLgEKQu34McwUvYIPCZNXQ3cyvm.jpg",
      },
      {
        name: "Prasad",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/p7kBIUfrYJDK4HJqvfrzagualHx.jpg",
      },
    ],
  },
  changeBody: () => { },
};

export default Genre;

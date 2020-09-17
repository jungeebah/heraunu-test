import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import MovieCastnCrew from "../MovieCastnCrew/MovieCastnCrew";
import Songs from "../Songs/Songs";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import Actor from "../Actor/Actor";
import Year from "../Year/Year";
import Genre from "../Genre/Genre";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  movieInfo: {
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2, 1, 2, 0),
    },
    padding: theme.spacing(2),
  },
  button: {
    "&:not(:first-child)": {
      marginLeft: theme.spacing(1),
    },
  },
  castCrew: {
    marginTop: theme.spacing(2),
  },
  card: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    borderRadius: 12,
    [theme.breakpoints.down("sm")]: {
      maxWidth: "200px",
      marginLeft: theme.spacing(0),
    },
    maxWidth: "400px",
  },
  spacing: {
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(5) + 7,
    },
    padding: "20px",
  },
  buttonYear: {
    borderRadius: theme.spacing(1),
    padding: "0px",
    color: theme.palette.primary.main,
  },
  year: {
    marginTop: theme.spacing(-1),
    paddingBottom: theme.spacing(1) - 2,
  },
  yearText: {
    fontWeight: "700",
  },
  box: {
    borderWidth: "1px",
  },
  menuDrawnLength: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "23%",
    },
  },
  length: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: "19%",
    },
    maxWidth: "10.4%",
  },
}));

const MoviePage = (props) => {
  const [displayPage, setDisplayPage] = React.useState("movie");
  const [actorInfo, setActorInfo] = React.useState([]);
  const [yearInfo, setYearInfo] = React.useState([]);
  const [genreList, setgenreList] = React.useState([]);

  const overRideChangeBody = (e, movieName) => {
    setDisplayPage("movie");
    props.changeBody(e, movieName);
  };
  const actorClick = (name, image) => {
    const movieList = props.data.filter((item) =>
      item.actor.map((actor) => actor.name.includes(name)).includes(true)
    );
    const actorObject = {
      name: name,
      image: image,
      movies: movieList.map((x) => ({ name: x.name, image: x.image })),
    };
    setActorInfo(actorObject);
    setDisplayPage("actor");
  };

  const yearClick = (e, year) => {
    const movieList = props.data.filter((item) => item.year === year);
    const yearObject = {
      name: year,
      movies: movieList.map((x) => ({ name: x.name, image: x.image })),
    };

    setYearInfo(yearObject);
    setDisplayPage("year");
  };

  const genreClick = (e, genre) => {
    const movieList = props.data.filter((item) => item.genre.includes(genre));
    const genreList = {
      name: genre,
      movies: movieList.map((x) => ({ name: x.name, image: x.image })),
    };

    setgenreList(genreList);
    setDisplayPage("genre");
  };

  const { movie } = props;
  return (
    <div>
      {(displayPage === "movie" && (
        <Movie
          movie={movie}
          menuDrawnLength={props.menuDrawnLength}
          actorClick={actorClick}
          yearClick={yearClick}
          genreClick={genreClick}
        />
      )) ||
        (displayPage === "actor" && (
          <Actor actor={actorInfo} changeBody={overRideChangeBody} menuDrawerOpen={props.menuDrawerOpen} />
        )) ||
        (displayPage === "genre" && (
          <Genre genre={genreList} changeBody={overRideChangeBody} menuDrawerOpen={props.menuDrawerOpen} />
        )) ||
        (displayPage === "year" && (
          <Year year={yearInfo} changeBody={overRideChangeBody} menuDrawerOpen={props.menuDrawerOpen} />
        )) || <div></div>}
    </div>
  );
};

MoviePage.propsType = {
  movie: PropTypes.object,
  menuDrawerOpen: PropTypes.bool,
};
MoviePage.defaultProps = {
  movie: {
    name: "Loot",
    image:
      "https://image.tmdb.org/t/p/w220_and_h330_face/d9pQHVVf2FbfY6ayPM7qseVLc5K.jpg",
    year: "2012",
    length: "2h 1m",
    playing: ["youtube"],
    streaming: [""],
    location: ["https://www.youtube.com/watch?v=oRjjJ5LkGPY"],
    genre: ["action", "comedy", "fantasy"],
    rating: "PG-13",
    actor: [
      {
        name: "Reecha Sharma",
        image:
          "https://image.tmdb.org/t/p/original/1f8Y1jAxZdWPPEbfmlrK48iIqFl.jpg",
      },
      {
        name: "Karma Shakya",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/19bUnoVIjzWpsGAzIfCvKudG7Tt.jpg",
      },
      {
        name: "Prateek Raj Neupane",
        image: "",
      },
      {
        name: "Saugat Malla",
        image:
          "https://image.tmdb.org/t/p/original/pbIOAtHytaDkd0nQGG9OPb5jUHN.jpg",
      },
      {
        name: "Dayahang Rai",
        image:
          "https://image.tmdb.org/t/p/original/ySK3NIzPYA4aYsGhPd17me29TsJ.jpg",
      },
      {
        name: "Sushil Raj Pandey",
        image: "",
      },
      {
        name: "Praween Khatiwada",
        image: "",
      },
      {
        name: "Srijana Subba",
        image:
          "https://image.tmdb.org/t/p/w600_and_h900_bestv2/1C2Aba7PQA6Y2N7GXL032vooyvN.jpg",
      },
    ],
    songs: ["Dui Rupaiyaa", "Kutu Ma Kutu", "Talkyo Jawani"],
  },
};

export default MoviePage;

const Movie = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { movie, actorClick } = props;
  return (
    <Paper elevation={0} className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={5} md={6}>
          <Card className={classes.card}>
            <CardMedia
              component="img"
              image={movie.image}
              title={movie.name}
            ></CardMedia>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Grid container direction="column" justify="space-between">
            {[1, 2].map((item) => (
              <Hidden only="xs" key={item}>
                <Grid item sm={2} key={item}>
                  <div className={classes.spacing}></div>
                </Grid>
              </Hidden>
            ))}
            <Grid item xs={12}>
              <Paper className={classes.movieInfo} elevation={0}>
                <Typography variant={mobile ? "h6" : "h3"}>
                  {movie.name}
                </Typography>

                <Grid container className={classes.year}>
                  <Grid item xs={2} md={2}>
                    <IconButton
                      className={classes.buttonYear}
                      onClick={(e) => props.yearClick(e, movie.year)}
                    >
                      <Typography
                        variant={mobile ? "caption" : "subtitle2"}
                        className={classes.yearText}
                      >
                        {movie.year}
                      </Typography>
                    </IconButton>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    md={2}
                    className={
                      props.menuDrawnLength
                        ? classes.length
                        : classes.menuDrawnLength
                    }
                  >
                    <Box className={classes.box}>
                      <Typography variant={mobile ? "caption" : "subtitle2"}>
                        {movie.length}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={2} md={1}>
                    <Box>
                      <Typography variant={mobile ? "caption" : "subtitle2"}>
                        {movie.rating}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={12}>
                    {movie.genre.map((item) => (
                      <Button
                        size={mobile ? "small" : "medium"}
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        key={item}
                        onClick={(e) => props.genreClick(e, item)}
                      >
                        {item}
                      </Button>
                    ))}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <div>
        <MovieCastnCrew
          actorClick={actorClick}
          menuDrawerOpen={props.menuDrawerOpen}
          actor={movie.actor}
        />
      </div>

      <Paper elevation={0}>
        <Songs songs={movie.songs} />
      </Paper>
    </Paper>
  );
};

import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import MovieCard from "../MovieCard/MovieCard";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles((theme) => ({
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
  actorInfo: {
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(2, 1, 2, 0),
      marginTop: "2px",
    },
    padding: theme.spacing(2),
  },
  actorMovie: {
    [theme.breakpoints.only("sm")]: {
      padding: theme.spacing(2),
    },
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(4, 2, 2, 2),
    },
  },
  noImage: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.up("md")]: {
      height: theme.spacing(73),
    },
    height: theme.spacing(34),
    maxWidth: "900px",
    justifyContent: "center",
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "60px",
    },
    [theme.breakpoints.between("xs", "sm")]: {
      fontSize: "70px",
    },
    fontSize: "400px",
  },
}));

const Actor = (props) => {
  const { actor } = props;
  const classes = useStyles();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const noImage = (
    <Paper className={classes.noImage}>
      <PersonIcon className={classes.icon} />
    </Paper>
  );
  return (
    <Paper elevation={0}>
      <Grid container>
        <Grid item xs={12} sm={5} md={6}>
          <Card className={classes.card}>
            {actor.image === "" ? (
              noImage
            ) : (
                <CardMedia
                  component="img"
                  image={actor.image}
                  title={actor.name}
                ></CardMedia>
              )}
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
              <Paper className={classes.actorInfo} elevation={0}>
                <Typography variant={mobile ? "h6" : "h3"}>
                  {actor.name}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Paper className={classes.actorMovie} elevation={0}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant={mobile ? "subtitle1" : "h4"}>
              Movies
            </Typography>
          </Grid>
          {actor.movies.map((item, index) => (
            <Grid item xs={6} sm={4} lg={3} xl={2} key={index}>
              <MovieCard
                changeBody={props.changeBody}
                image={item.image || item.video_thumbnail}
                movie={item.name}
                url={`https://healthy-system-267921.uc.r.appspot.com/api/youtubes/${item.movie_id}`}
                key={index}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Paper>
  );
};

Actor.propsType = {
  actor: PropTypes.object,
  menuDrawerOpen: PropTypes.bool,
};

Actor.defaultProps = {
  actor: {
    name: "Bipin Karki",
    image:
      "https://image.tmdb.org/t/p/w600_and_h900_bestv2/kD6FEERakHmYVWhiRmwjKIp7wDJ.jpg",
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
};
export default Actor;

import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MenuDrawer from "../MenuDrawer/MenuDrawer";
import MovieCard from "../MovieCard/MovieCard";
import clsx from "clsx";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { movie } from "../../data";
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import Filter from "../Filter/Filter";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import MoviePage from "../MoviePage/MoviePage";

const drawerWidth = 180;
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
  },
  snackBar: {
    zIndex: "10000",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start",
  },
  content: {
    marginTop: theme.spacing(7) + 1,
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
    marginLeft: theme.spacing(8) + 1,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: drawerWidth,
  },
  warning: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  about: {
    padding: theme.spacing(2, 2, 2, 2),
  },
}));

const Body = (props) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [menuDrawerOpen, setMenuDrawerOpen] = React.useState(false);
  const { data, title, changeTitle, searchFilter } = props;
  const [filters, setFilters] = React.useState([]);
  const [movie, setMovie] = React.useState(data);
  const [genre, setGenre] = React.useState("All");
  const [year, setYear] = React.useState("All");
  const [filterChip, setChip] = React.useState([]);
  const [filterOpenChecked, setfilterOpenChecked] = React.useState(false);
  const [undoOpen, setUndoOpen] = React.useState(true);

  const handleUndoClose = (event) => {
    setUndoOpen(false);
  };
  const handleFilterUndo = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (filters[filters.length - 1].key === "G") {
      setGenre("All");
      setChip((chips) => chips.filter((chip) => chip.key !== "G"));
    } else {
      setChip((chips) => chips.filter((chip) => chip.key !== "Y"));
      setYear("All");
    }
    const filtered = filters.filter((x, i) => i !== filters.length - 1);
    setFilters(filtered);
  };
  React.useEffect(() => {
    setMovie(data);
    setYear("All");
    setGenre("All");
    setChip([]);
    setfilterOpenChecked(false);
    setUndoOpen(true);
  }, [data]);

  React.useEffect(() => {
    filterUpdate();
    setUndoOpen(true);
  }, [filters]);

  const filterUpdate = () => {
    var filtering = data;
    if (filters.length > 0) {
      filters.forEach((item1) => {
        if (filtering.length > 0) {
          filtering = filtering.filter(item1.value);
        }
      });
      setMovie(filtering);
    } else {
      setMovie(data);
    }
  };

  const handleDelete = (chipToDelete) => () => {
    setChip((chips) =>
      chips.filter((chip) => chip.value !== chipToDelete.value)
    );
    if (chipToDelete.key === "G") {
      setGenre("All");
      setFilters((items) => items.filter((x) => x.key !== "G"));
    } else {
      setYear("All");
      setFilters((items) => items.filter((x) => x.key !== "Y"));
    }
  };

  const handleChangeFilter = (event) => {
    event.persist();
    switch (event.target.id) {
      case "genre":
        if (filterChip.filter((x) => x.key === "G").length > 0) {
          filterChip.find(
            (x) => x.key === "G" && ((x.value = event.target.value), true)
          );
          setChip(filterChip);
          filters.find(
            (x) =>
              x.key === "G" &&
              ((x.value = (a) =>
                a.genre.includes(event.target.value.toLowerCase())),
              true)
          );
        } else {
          setChip((chips) =>
            chips.concat({ key: "G", value: event.target.value })
          );
          setFilters((item) =>
            item.concat({
              key: "G",
              value: (x) => x.genre.includes(event.target.value.toLowerCase()),
            })
          );
        }
        setGenre(event.target.value);
        break;
      case "year":
        if (filterChip.filter((x) => x.key === "Y").length > 0) {
          filterChip.find(
            (x) => x.key === "Y" && ((x.value = event.target.value), true)
          );
          setChip(filterChip);
          filters.find(
            (x) =>
              x.key === "Y" &&
              ((x.value = (a) => a.year === event.target.value), true)
          );
        } else {
          setChip((chips) =>
            chips.concat({ key: "Y", value: event.target.value })
          );
          setFilters((item) =>
            item.concat({
              key: "Y",
              value: (x) => x.year === event.target.value,
            })
          );
        }
        setYear(event.target.value);
        break;
      default:
        break;
    }
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MenuDrawer
        searchFilter={searchFilter}
        changeTitle={changeTitle}
        open={menuDrawerOpen}
        setOpen={setMenuDrawerOpen}
        drawerwidth={drawerWidth}
        mobileDrawer={props.mobileDrawer}
        toggleDrawer={props.toggleDrawer}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: mobile ? false : menuDrawerOpen,
        })}
      >
        {props.displayBody ? (
          <Main
            title={title}
            filterOpenChecked={filterOpenChecked}
            setfilterOpenChecked={setfilterOpenChecked}
            filterChip={filterChip}
            genre={genre}
            year={year}
            handleChangeFilter={handleChangeFilter}
            handleDelete={handleDelete}
            movie={movie}
            undoOpen={undoOpen}
            handleFilterUndo={handleFilterUndo}
            handleUndoClose={handleUndoClose}
            changeBody={props.changeBody}
          />
        ) : (
          <MoviePage movie={props.individualMovie[0]} />
        )}
      </main>
    </div>
  );
};

Body.propsType = {
  title: PropTypes.string,
  data: PropTypes.array,
  changeTitle: PropTypes.func,
  changeBody: PropTypes.func,
};

Body.defaultProps = {
  title: "Home",
  data: movie,
  displayBody: true,
  changeTitle: () => {},
  changeBody: () => {},
};

export default Body;

const currentYear = new Date().getFullYear();
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
const rangeYear = range(currentYear, currentYear - 50, -1);
const yearList = ["All", ...rangeYear];

const Main = (props) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const {
    changeBody,
    title,
    filterOpenChecked,
    setfilterOpenChecked,
    filterChip,
    genre,
    year,
    handleChangeFilter,
    handleDelete,
    movie,
    undoOpen,
    handleFilterUndo,
    handleUndoClose,
  } = props;
  return (
    <div>
      {title === "About" ? (
        <div></div>
      ) : (
        <Filter
          yearList={yearList}
          filterOpenChecked={filterOpenChecked}
          setfilterOpenChecked={setfilterOpenChecked}
          filterChip={filterChip}
          genre={genre}
          year={year}
          handleChangeGenre={handleChangeFilter}
          handleChangeYear={handleChangeFilter}
          handleDelete={handleDelete}
        />
      )}
      <div className={classes.drawerHeader}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">{title}</Typography>
          </Grid>
          {title === "About" ? (
            <Paper elevation={0} className={classes.about}>
              <Typography variant="body">
                A simple Nepali movie web app designed for Nepali movies and
                it's lovers.
              </Typography>
            </Paper>
          ) : title === "Theater" ? (
            <div className={classes.warning}>
              <Alert severity="warning">
                Due to Covid-19.Theaters are temproraly closed until further
                notice!
              </Alert>
            </div>
          ) : movie.length > 0 ? (
            movie.map((item, index) => (
              <Grid item xs={6} sm={3} xl={2} key={index}>
                <MovieCard
                  changeBody={changeBody}
                  image={item.image}
                  movie={item.name}
                  key={index}
                />
              </Grid>
            ))
          ) : (
            <Snackbar
              className={classes.snackBar}
              anchorOrigin={{
                vertical: mobile ? "top" : "bottom",
                horizontal: mobile ? "right" : "left",
              }}
              open={undoOpen}
              autoHideDuration={6000}
              onClose={handleFilterUndo}
              message="No movies to Display"
              action={
                <React.Fragment>
                  <Button
                    color="secondary"
                    size="small"
                    onClick={handleFilterUndo}
                  >
                    UNDO
                  </Button>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleUndoClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
          )}
        </Grid>
      </div>
    </div>
  );
};

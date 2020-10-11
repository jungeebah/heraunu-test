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
import Pagination from '@material-ui/lab/Pagination';
import { movieSelector, getMovies } from '../../slice/movieSlice';
import { youtubeSelector, getYoutubeMovies } from '../../slice/youtubeSlice';
import { useSelector, useDispatch } from 'react-redux';

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
  const movies = useSelector(movieSelector);
  const youtube = useSelector(youtubeSelector)
  const [menuDrawerOpen, setMenuDrawerOpen] = React.useState(false);
  const { data, searchFilter } = props;
  const [filters, setFilters] = React.useState([]);
  const [movie, setMovie] = React.useState(data.movies);
  const [genre, setGenre] = React.useState("All");
  const [title, setTitle] = React.useState("Home");
  const [year, setYear] = React.useState("All");
  const [filterChip, setChip] = React.useState([]);
  const [filterOpenChecked, setfilterOpenChecked] = React.useState(false);
  const [undoOpen, setUndoOpen] = React.useState(true);
  const [page, setPage] = React.useState(1)
  const [totalPage, setTotalPage] = React.useState(movies.count)
  const dispatch = useDispatch();
  // const [displayBody, setDisplayBody] = React.useState(true);
  const nextPage = number => setPage(number)

  React.useEffect(() => {
    changeTitle(title)
  }, [page])

  React.useEffect(() => {
    const page_item = movies.page.filter(a => a.x === page)
    const page_index = movies.page.map(a => { return a.x }).indexOf(page)
    setMovie(movies.movies.slice(page_index * 10, page_index * 10 + (page_item.length > 0 ? page_item[0].y : 0)))
    setTotalPage(movies.count)
  }, [movies]);

  React.useEffect(() => {
    const page_item = youtube.page.filter(a => a.x === page)
    const page_index = youtube.page.map(a => { return a.x }).indexOf(page)
    setMovie(youtube.movies.slice(page_index * 10, page_index * 10 + (page_item.length > 0 ? page_item[0].y : 0)))
    setTotalPage(youtube.count)
  }, [youtube]);

  const changeTitle = (title) => {
    setTitle(title)
    switch (title) {
      case ('Home'):
        setTotalPage(movies.count)
        const movie_page_item = movies.page.filter(a => a.x === page)
        const movie_page_index = movies.page.map(a => { return a.x }).indexOf(page)
        movie_page_item.length > 0 ? setMovie(movies.movies.slice(movie_page_index * 10, movie_page_index * 10 + movie_page_item[0].y))
          :
          dispatch(getMovies(page))
        break;
      case ('Youtube'):
        setTotalPage(youtube.count)
        const youtube_page_item = youtube.page.filter(a => a.x === page)
        const youtube_page_index = youtube.page.map(a => { return a.x }).indexOf(page)
        if (youtube_page_item.length > 0) {
          setMovie(youtube.movies.slice(youtube_page_index * 10, youtube_page_index * 10 + youtube_page_item[0].y))
        }
        else {
          dispatch(getYoutubeMovies(page))
        }
    }
  };

  const handleUndoClose = (event) => {
    setUndoOpen(false);
  };
  const handleFilterUndo = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (filters.length === 0) {
      setGenre('All')
    } else if (filters && filters[filters.length - 1].key === "G") {
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
    setMovie(data.movies);
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
    var filtering = data.movies;
    if (filters.length > 0) {
      filters.forEach((item1) => {
        console.log(item1)
        if (filtering && filtering.length > 0) {
          filtering = filtering.filter(item1.value);
        }
      });
      setMovie(filtering);
    } else {
      setMovie(data.movies);
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
    console.log(event.target.value, filters)
    event.persist();
    switch (event.target.id) {
      case "genre":
        if (filterChip.filter((x) => x.key === "G").length > 0) {
          filterChip.find(
            (x) => x.key === "G" && ((x.value = event.target.value), true)
          );
          setChip(filterChip);
          const filterUpdated = filters.find(
            (x) =>
              x.key === "G" &&
              ((x.value = (a) =>
                a.genre.map(g => g.name.toLowerCase()).includes(event.target.value.toLowerCase())),
                true)
          );
          setFilters((item) => item.concat(filterUpdated))
        } else {
          setChip((chips) =>
            chips.concat({ key: "G", value: event.target.value })
          );
          setFilters((item) =>
            item.concat({
              key: "G",
              value: (x) => x.genre.map(g => g.name.toLowerCase()).includes(event.target.value.toLowerCase()),
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
          const yearFilter = filters.find(
            (x) =>
              x.key === "Y" &&
              ((x.value = (a) => new Date(a.release_date).getFullYear() + 1 === parseInt(event.target.value)), true)
          );
          setFilters(item => item.concat(yearFilter))
        } else {
          setChip((chips) =>
            chips.concat({ key: "Y", value: event.target.value })
          );
          setFilters((item) =>
            item.concat({
              key: "Y",
              value: (a) => (new Date(a.release_date).getFullYear() + 1) === parseInt(event.target.value),
            })
          );
        }
        setYear(event.target.value);
        break;
      default:
        break;
    }
  };
  // console.log(data, filters, movie)
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
            filters={filters}
            genre={genre}
            year={year}
            nextPage={nextPage}
            data={totalPage}
            handleChangeFilter={handleChangeFilter}
            handleDelete={handleDelete}
            movie={movie}
            undoOpen={undoOpen}
            handleFilterUndo={handleFilterUndo}
            handleUndoClose={handleUndoClose}
            changeBody={props.changeBody}
          />
        ) : (
            <MoviePage
              changeBody={props.changeBody}
              data={props.data}
              movie={props.individualMovie[0]}
              menuDrawerOpen={menuDrawerOpen}
            />
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
  changeTitle: () => { },
  changeBody: () => { },
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
  const large = useMediaQuery(theme.breakpoints.up("lg"));
  const classes = useStyles();

  const {
    filters,
    changeBody,
    title,
    filterOpenChecked,
    setfilterOpenChecked,
    filterChip,
    data,
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
          <Grid item xs={3} sm={7} lg={9}>
            <Typography variant="h5">{title}</Typography>
          </Grid>
          {data > 10 ?
            <Grid item xs={9} sm={5} lg={3} justify="flex-end">
              <Pagination
                count={data % 10 === 0 ? data / 10 : Math.floor(data / 10) + 1}
                defaultPage={1}
                siblingCount={0}
                variant="outlined"
                size={large ? "large" : "small"}
                shape="rounded"
                onChange={(e, v) => props.nextPage(v)}
              />
            </Grid>
            : <Grid item xs={9} sm={5} lg={3} justify="flex-end">
              <div></div>
            </Grid>}
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
          ) : movie && movie.length > 0 ? (
            movie.map((item, index) => (
              <Grid item xs={6} sm={4} lg={3} xl={2} key={index}>
                <MovieCard
                  changeBody={changeBody}
                  image={item.image}
                  movie={item.name}
                  key={index}
                />
              </Grid>
            ))
          ) : filters && filters.length > 0 ?
                  (
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
                  ) :
                  <div></div>}
        </Grid>
      </div>
    </div>
  );
};

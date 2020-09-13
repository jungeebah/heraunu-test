import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import MovieCard from '../MovieCard/MovieCard';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { movie } from '../../data';
import Alert from '@material-ui/lab/Alert';
import Paper from '@material-ui/core/Paper';
import Filter from '../Filter/Filter';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 180;
const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100vh',

    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        marginTop: theme.spacing(7) + 1,
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.down('xs')]: {
            marginLeft: 0
        },
        marginLeft: theme.spacing(8) + 1,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    },
    warning: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    about: {
        padding: theme.spacing(2, 2, 2, 2)
    }
}))


const Body = (props) => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    const [open, setOpen] = React.useState(false);
    const { data, title, changeTitle, searchFilter } = props
    const [filters, setFilters] = React.useState([])
    const [movie, setMovie] = React.useState(data)
    const [genre, setGenre] = React.useState('All');
    const [year, setYear] = React.useState('All');
    const [filterChip, setChip] = React.useState([]);
    const [checked, setChecked] = React.useState(false);
    const [opens, setOpens] = React.useState(true);

    const handleClick = () => {
        setOpens(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setFilters((items) => {
            if (items.key === 'G') {
                setGenre('All')
                setChip((chips) => chips.filter((chip) => chip.key !== 'G'));
            } else {
                setChip((chips) => chips.filter((chip) => chip.key !== 'Y'));
                setYear('All')
            }
            return items.splice(0, 1)
        })
    };
    React.useEffect(() => {
        setMovie(data)
        setYear('All')
        setGenre('All')
        setChip([])
        setChecked(false)
    }, [data]);

    React.useEffect(() => {
        filterUpdate()
    }, [filters])

    const filterUpdate = () => {
        var filtering = data
        if (filters.length > 0) {
            filters.forEach((item1) => {
                if (filtering.length > 0) {
                    filtering = filtering.filter(item1.value)
                }
            })
        }
        setMovie(filtering)
    };
    const handleDelete = (chipToDelete) => () => {
        setChip((chips) => chips.filter((chip) => chip.value !== chipToDelete.value));
        if (chipToDelete.key === 'G') {
            setGenre('All')
            setFilters((items) => items.filter((x) => x.key !== 'G'))
        } else {
            setYear('All');
            setFilters((items) => items.filter((x) => x.key !== 'Y'))
        }

    };
    const handleChangeGenre = (event) => {
        event.persist();
        if ((filterChip.filter(x => x.key === 'G')).length > 0) {
            filterChip.find(x => x.key === 'G' && (x.value = event.target.value, true))
            setChip(filterChip)
            filters.find((x) => x.key === 'G' && (x.value = (a) => a.genre.includes(event.target.value.toLowerCase()), true))
        } else {
            setChip((chips) => chips.concat({ key: 'G', value: event.target.value }))
            setFilters((item) => item.concat({ key: 'G', value: (x) => x.genre.includes(event.target.value.toLowerCase()) }))
        }
        setGenre(event.target.value);
    };
    const handleChangeYear = (event) => {
        event.persist();
        if ((filterChip.filter(x => x.key === 'Y')).length > 0) {
            filterChip.find(x => x.key === 'Y' && (x.value = event.target.value, true))
            setChip(filterChip)
            filters.find((x) => x.key === 'Y' && (x.value = (a) => a.year === event.target.value, true))
        } else {
            setChip((chips) => chips.concat({ key: 'Y', value: event.target.value }))
            setFilters((item) => item.concat({ key: 'Y', value: (x) => x.year === event.target.value }))
        }
        setYear(event.target.value);
    };
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MenuDrawer
                searchFilter={searchFilter}
                changeTitle={changeTitle}
                open={open}
                setOpen={setOpen}
                drawerwidth={drawerWidth}
                mobileDrawer={props.mobileDrawer}
                toggleDrawer={props.toggleDrawer} />
            <main className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                {title === 'About' ? <div></div> :
                    <Filter
                        checked={checked}
                        setChecked={setChecked}
                        filterChip={filterChip}
                        genre={genre}
                        year={year}
                        handleChangeGenre={handleChangeGenre}
                        handleChangeYear={handleChangeYear}
                        handleDelete={handleDelete}
                    />
                }
                <div className={classes.drawerHeader}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} >
                            <Typography variant="h5" >
                                {title}
                            </Typography>
                        </Grid>
                        {title === 'About' ?
                            <Paper elevation={0} className={classes.about}>
                                <Typography variant="body">
                                    A simple Nepali movie web app designed for Nepali movies and it's lovers.
                            </Typography>
                            </Paper>

                            : title === 'Theater' ?
                                <div className={classes.warning}>
                                    <Alert severity="warning">Due to Covid-19.Theaters are temproraly closed until further notice!</Alert>
                                </div> :
                                movie.length > 0 ?
                                    movie.map((item, index) => (
                                        <Grid item xs={6} sm={3} xl={2} key={index}>
                                            <MovieCard image={item.image} movie={item.name} key={index} />
                                        </Grid>
                                    )) : <Snackbar
                                        anchorOrigin={{
                                            vertical: mobile ? 'top' : 'bottom',
                                            horizontal: mobile ? 'right' : 'left',
                                        }}
                                        open={opens}
                                        autoHideDuration={6000}
                                        onClose={handleClose}
                                        message="No movies to Display"
                                        action={
                                            <React.Fragment>
                                                <Button color="secondary" size="small" onClick={handleClose}>
                                                    UNDO
                                    </Button>
                                                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                                    <CloseIcon fontSize="small" />
                                                </IconButton>
                                            </React.Fragment>
                                        }
                                    />}

                    </Grid>
                </div>
            </main>
        </div>
    )
}

Body.propsType = {
    title: PropTypes.string,
    data: PropTypes.array,
    changeTitle: PropTypes.func,
}

Body.defaultProps = {
    title: 'Home',
    data: movie,
    changeTitle: () => { },
}


export default Body;
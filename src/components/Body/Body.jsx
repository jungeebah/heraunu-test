import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import MovieCard from '../MovieCard/MovieCard';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

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
}))

const Body = (props) => {
    const [title, setTitle] = React.useState('Home');
    const changeTitle = (title) => {
        setTitle(title)
    }
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MenuDrawer
                changeTitle={changeTitle}
                open={open}
                setOpen={setOpen}
                drawerwidth={drawerWidth}
                mobileDrawer={props.mobileDrawer}
                toggleDrawer={props.toggleDrawer} />
            <main className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                <div className={classes.drawerHeader}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Typography variant="h5">
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={3} xl={2}>
                            <MovieCard />
                        </Grid>
                        <Grid item xs={6} sm={3} xl={2}>
                            <MovieCard />
                        </Grid>
                        <Grid item xs={6} sm={3} xl={2}>
                            <MovieCard />
                        </Grid>
                        <Grid item xs={6} sm={3} xl={2}>
                            <MovieCard />
                        </Grid>
                        <Grid item xs={6} sm={3} xl={2}>
                            <MovieCard />
                        </Grid>
                        <Grid item xs={6} sm={3} xl={2}>
                            <MovieCard />
                        </Grid>
                    </Grid>
                </div>
            </main>
        </div>
    )
}

Body.propsType = {
    title: PropTypes.string
}

Body.defaultProps = {
    title: 'Home'
}


export default Body;
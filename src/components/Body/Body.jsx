import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import MovieCard from '../MovieCard/MovieCard';
import clsx from 'clsx';

const drawerWidth = 180;
const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100%',
        height: '100vh'
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
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MenuDrawer
                open={open}
                setOpen={setOpen}
                drawerwidth={drawerWidth}
                mobileDrawer={props.mobileDrawer}
                toggleDrawer={props.toggleDrawer} />
            <main className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                <div className={classes.drawerHeader}>
                    <MovieCard />
                </div>
            </main>
        </div>
    )
}

export default Body;
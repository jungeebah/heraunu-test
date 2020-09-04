import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuDrawer from '../MenuDrawer/MenuDrawer';
import MovieCard from '../MovieCard/MovieCard'

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100%',
        height: '100vh'
    },
    movieCard: {
        marginLeft: theme.spacing(10)
    },
}))

const Body = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MenuDrawer
                mobileDrawer={props.mobileDrawer}
                toggleDrawer={props.toggleDrawer} />
            <div>
                <MovieCard className={classes.movieCard} />
            </div>
        </div>
    )
}

export default Body;
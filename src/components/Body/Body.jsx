import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100%',
        height: '100vh'
    },
}))

const Body = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>

        </div>
    )
}

export default Body;
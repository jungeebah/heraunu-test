import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuDrawer from '../MenuDrawer/MenuDrawer'

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: '100%',
        height: '100vh'
    },
}))

const Body = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <MenuDrawer
                mobileDrawer={props.mobileDrawer}
                toggleDrawer={props.toggleDrawer} />
        </div>
    )
}

export default Body;
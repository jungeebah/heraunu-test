import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AutoComplete from '../AutoComplete/AutoComplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const drawerWidth = 240;
const mobileDrawerWidth = 200;
const largeScreenDrawerWidth = 300;
const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        [theme.breakpoints.down('xs')]: {
            width: mobileDrawerWidth,
        },
        [theme.breakpoints.up('xl')]: {
            width: largeScreenDrawerWidth,
        },
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

const MenuDrawer = (props) => {
    const { mobileDrawer, toggleDrawer } = props
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    const searchBox = <div><AutoComplete width={170} /></div>
    const drawerList = <div
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}>
        <List>
            {mobile ?
                <IconButton onClick={(e) => { toggleDrawer(false) }}>
                    <ChevronLeftIcon />
                </IconButton> :
                <div></div>
            }
            <ListItem>
                {mobile ? searchBox : <div></div>}
            </ListItem>
        </List>
        <Divider />

        <List >
            {['Theater', 'Streaming', 'Youtube'].map((text, index) => (
                <ListItem button key={text}>
                    <ListItemText primary={text} />
                </ListItem>
            ))}
        </List>
        <Divider />
        <List subheader={<ListSubheader>Filter</ListSubheader>}>

        </List>
    </div>
    return (
        <div>
            {mobile ?
                <SwipeableDrawer
                    anchor="left"
                    open={mobileDrawer}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    {drawerList}
                </SwipeableDrawer>
                :
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.toolbar} />
                    {drawerList}
                </Drawer>}
        </div>
    )
}

MenuDrawer.propsType = {
    mobileDrawer: PropTypes.bool,
    toggleDrawer: PropTypes.func,
}
MenuDrawer.defaultProps = {
    mobileDrawer: true,
    toggleDrawer: () => { }
}

export default MenuDrawer;
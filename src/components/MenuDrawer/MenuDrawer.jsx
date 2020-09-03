import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AutoComplete from '../AutoComplete/AutoComplete';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import HomeIcon from '@material-ui/icons/Home';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import HdIcon from '@material-ui/icons/Hd';
import YouTubeIcon from '@material-ui/icons/YouTube';

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
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(8) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },

}));

const MenuDrawer = (props) => {
    const { mobileDrawer, toggleDrawer } = props
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const menuItems = ['Home', 'Youtube', 'Streaming', 'Theater']
    const menuIcons = [<HomeIcon />, <YouTubeIcon />, <HdIcon />, <ConfirmationNumberIcon />]
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    const searchBox = <div><AutoComplete width={170} /></div>
    const drawerList = <div
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}>
        {mobile ? <div>
            <List>
                <IconButton onClick={(e) => { toggleDrawer(false) }}>
                    <ChevronLeftIcon />
                </IconButton>
                <ListItem>
                    {searchBox}
                </ListItem>
            </List>
            <Divider />
        </div>
            :
            <div>
                <div className={classes.toolbar}>
                    {open ?
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton> :
                        <IconButton onClick={handleDrawerOpen}>
                            <ChevronRightIcon />
                        </IconButton>
                    }</div>
                <Divider />
            </div>
        }

        <List >
            {menuItems.map((text, index) => (
                <ListItem button key={text}>
                    <ListItemIcon>{menuIcons[index]}</ListItemIcon>
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
                    PaperProps={{ elevation: 5 }}
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx(classes.drawerPaper, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar} />
                    {drawerList}
                </Drawer>}
        </div >
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
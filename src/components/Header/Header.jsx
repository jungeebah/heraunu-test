import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import PropTypes from 'prop-types';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AutoComplete from '../AutoComplete/AutoComplete'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(1),
        },
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    return (
        <div>
            <AppBar position="static" >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Herchu
                    </Typography>
                    {mobile ?
                        <div></div>
                        : <AutoComplete />}
                    <IconButton
                        edge="end"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="theme"
                        onClick={props.handleChangeTheme}
                    >
                        {props.theme ? <Brightness5Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )
}

Header.propsType = {
    handleChangeTheme: PropTypes.func,
    theme: PropTypes.string,
}

Header.defaultProps = {
    theme: false
}

export default Header;
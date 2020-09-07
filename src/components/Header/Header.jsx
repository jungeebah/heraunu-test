import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'
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
    appbar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        [theme.breakpoints.down('sm')]: {
            marginRight: theme.spacing(1),
        },
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            textAlign: 'center'
        }
    },
}));

const Header = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    const onMobileTitle = <Typography variant="h6" edge="center" className={classes.title}>
        Herchu
</Typography>
    return (
        <div>
            <AppBar position="fixed" className={classes.appbar}>
                <Toolbar>
                    {mobile ?
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="menu"
                            onClick={props.toggleDrawer(true)} >
                            <MenuIcon />
                        </IconButton> : <div></div>}
                    {mobile ? onMobileTitle : <Typography variant="h6" className={classes.title}>
                        Herchu
                    </Typography>}
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
    toggleDrawer: PropTypes.func,
}

Header.defaultProps = {
    theme: false,
    toggleDrawer: () => { },
    handleChangeTheme: () => { }
}

export default Header;
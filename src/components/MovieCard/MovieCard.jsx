import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

const useStyles = makeStyles((theme) => ({
    paper: {
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(14),
            height: theme.spacing(22) + 2,
        },
        width: theme.spacing(22),
        height: theme.spacing(34),
        boxShadow: theme.shadows[10]

    },
    card: {
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(10),
            height: theme.spacing(15),
        },
        width: theme.spacing(18),
        height: theme.spacing(26),
        margin: theme.spacing(1, 0, 0, 2),
        boxShadow: theme.shadows[10]
    },
    media: {
        width: 152
    },
    title: {
        textAlign: 'left',
        padding: theme.spacing(1, 1, 0, 2),
    },
    fab: {
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
            bottom: theme.spacing(6),
            left: theme.spacing(8),
        },
        bottom: theme.spacing(6),
        left: theme.spacing(14),
    },
}))

const MovieCard = (props) => {
    const theme = useTheme();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [displayFab, setDisplayFab] = React.useState(false);
    const onMouseOver = () => {
        setDisplayFab(true)
    }
    const onMouseOut = () => {
        setDisplayFab(false)
    }
    const classes = useStyles();
    return (
        <div>
            <Card
                className={classes.paper}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut} >

                <CardActionArea
                    onClick={props.cardClick}>
                    <CardMedia
                        component="img"
                        className={classes.card}
                        image={props.image}
                        title={props.movie}>
                    </CardMedia>

                    <Typography
                        variant={smallScreen ? "subtitle2" : "body1"}
                        className={classes.title}>
                        {props.movie}
                    </Typography>
                </CardActionArea>
                <Zoom
                    in={displayFab}
                    timeout={transitionDuration}
                    style={{
                        transitionDelay: `${displayFab ? transitionDuration.exit : 0}ms`,
                    }}
                    unmountOnExit
                >
                    <Fab
                        aria-label="play"
                        className={classes.fab}
                        size={smallScreen ? "small" : "large"}
                        color="primary"
                        onClick={props.fabClick}>
                        <PlayArrowIcon />
                    </Fab>
                </Zoom>
            </Card >

        </div >
    )
}

MovieCard.propsType = {
    image: PropTypes.string,
    movie: PropTypes.string,
    cardClick: PropTypes.func,
    fabClick: PropTypes.func
}

MovieCard.defaultProps = {
    image: 'https://image.tmdb.org/t/p/w220_and_h330_face/d9pQHVVf2FbfY6ayPM7qseVLc5K.jpg',
    movie: 'Loot',
    cardClick: () => { console.log('pressed') },
    fabClick: () => { console.log('fab clicked') }
}

export default MovieCard
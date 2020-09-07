import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';


const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(10),
            height: theme.spacing(15),
        },
        width: theme.spacing(22),
        height: theme.spacing(44),
        margin: theme.spacing(1, 0, 0, 2),
        boxShadow: theme.shadows[10]
    },
    paper: {
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(14),
            height: theme.spacing(21),
        },
        width: theme.spacing(22),
        height: theme.spacing(34),
    },
    card: {
        [theme.breakpoints.down('sm')]: {
            width: theme.spacing(10),
            height: theme.spacing(15),
        },
        width: theme.spacing(18),
        height: theme.spacing(26),
        margin: theme.spacing(3, 0, 0, 2),
        boxShadow: theme.shadows[10]
    },
    cardContent: {
        padding: theme.spacing(1, 0, 0, 1)
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    button: {
        color: theme.palette.warning.main
    }
}));


const MovieCard3 = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.paper}>
                <Card >
                    <CardMedia className={classes.card}
                        component="img"
                        alt="Contemplative Reptile"
                        image={props.image}
                        title={props.movie}
                    />
                </Card>
            </Paper>
        </div>
    )
}

MovieCard3.propsType = {
    image: PropTypes.string,
    movie: PropTypes.string,
    cardClick: PropTypes.func,
    fabClick: PropTypes.func
}

MovieCard3.defaultProps = {
    image: 'https://image.tmdb.org/t/p/w220_and_h330_face/d9pQHVVf2FbfY6ayPM7qseVLc5K.jpg',
    movie: 'Loot',
    cardClick: () => { console.log('pressed') },
    fabClick: () => { console.log('fab clicked') }
}

export default MovieCard3
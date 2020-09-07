import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import InfoIcon from '@material-ui/icons/Info';
import Grid from '@material-ui/core/Grid'

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


const MovieCard2 = (props) => {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.root}>
                <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="270"
                    image={props.image}
                    title={props.movie}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.movie}
                    </Typography>
                </CardContent>


                <Grid container spacing={2}>
                    <Grid item xs={6}>

                        <IconButton size="small" className={classes.button}>
                            <PlayArrowIcon />
                                Play
        </IconButton>
                    </Grid>

                    <Grid item xs={6}>

                        <IconButton size="small" className={classes.button}>
                            <InfoIcon />
                                Info
        </IconButton>
                    </Grid>

                </Grid>

            </Card>
        </div>
    )
}

MovieCard2.propsType = {
    image: PropTypes.string,
    movie: PropTypes.string,
    cardClick: PropTypes.func,
    fabClick: PropTypes.func
}

MovieCard2.defaultProps = {
    image: 'https://image.tmdb.org/t/p/w220_and_h330_face/d9pQHVVf2FbfY6ayPM7qseVLc5K.jpg',
    movie: 'Loot',
    cardClick: () => { console.log('pressed') },
    fabClick: () => { console.log('fab clicked') }
}

export default MovieCard2
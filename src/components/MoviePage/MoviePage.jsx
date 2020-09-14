import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import MovieCastnCrew from '../MovieCastnCrew/MovieCastnCrew';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1)
    },
    movieInfo: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(1)
    },
    button: {
        "&:not(:first-child)": {
            marginLeft: theme.spacing(1)
        },

    },
    castCrew: {
        marginTop: theme.spacing(2)
    },
}))

const MoviePage = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    const { movie } = props
    return (
        <Paper elevation={0} className={classes.root}>
            <Card>
                <CardMedia
                    component="img"
                    image={movie.image}
                    title={movie.name}
                ></CardMedia>
            </Card>
            <Paper className={classes.movieInfo}>
                <Typography variant={mobile ? 'h6' : 'h3'}>
                    {movie.name}
                </Typography>
                <Grid container>
                    <Grid item xs={3} sm={2} md={1}>
                        <Typography>
                            {movie.year}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={2} md={1}>
                        <Typography>
                            {movie.length}
                        </Typography>
                    </Grid>
                    <Grid item xs={3} sm={2} md={1}>
                        <Typography>
                            {movie.rating}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {movie.genre.map((item) => (
                            <Button
                                size={mobile ? 'small' : 'medium'}
                                className={classes.button}
                                variant="contained"
                                color="primary"
                                key={item}>
                                {item}
                            </Button>
                        ))}
                    </Grid>
                </Grid>
            </Paper>
            <MovieCastnCrew
                actor={movie.actor}
                className={classes.castCrew} />
        </Paper >
    )
}

MoviePage.propsType = {
    movie: PropTypes.object
}
MoviePage.defaultProps = {
    movie: {
        "name": "Loot",
        "image": "https://image.tmdb.org/t/p/w220_and_h330_face/d9pQHVVf2FbfY6ayPM7qseVLc5K.jpg",
        "year": "2012",
        "length": "2h 1m",
        "playing": ["youtube"],
        "streaming": [""],
        "location": ["https://www.youtube.com/watch?v=oRjjJ5LkGPY"],
        "genre": [
            "action",
            "comedy",
            "fantasy"
        ],
        "rating": "PG-13",
        "actor": [
            {
                "name": "Reecha Sharma",
                "image": "https://image.tmdb.org/t/p/original/1f8Y1jAxZdWPPEbfmlrK48iIqFl.jpg"
            },
            {
                "name": "Karma Shakya",
                "image": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/19bUnoVIjzWpsGAzIfCvKudG7Tt.jpg"
            },
            {
                "name": "Prateek Raj Neupane",
                "image": ""
            },
            {
                "name": "Saugat Malla",
                "image": "https://image.tmdb.org/t/p/original/pbIOAtHytaDkd0nQGG9OPb5jUHN.jpg"
            },
            {
                "name": "Dayahang Rai",
                "image": "https://image.tmdb.org/t/p/original/ySK3NIzPYA4aYsGhPd17me29TsJ.jpg"
            },
            {
                "name": "Sushil Raj Pandey",
                "image": ""
            },
            {
                "name": "Praween Khatiwada",
                "image": ""
            },
            {
                "name": "Srijana Subba",
                "image": "https://image.tmdb.org/t/p/w600_and_h900_bestv2/1C2Aba7PQA6Y2N7GXL032vooyvN.jpg"
            }
        ],
        "songs": [
            "Dui Rupaiyaa",
            "Kutu Ma Kutu",
            "Talkyo Jawani"
        ]
    }
}

export default MoviePage;
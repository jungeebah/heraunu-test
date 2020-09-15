import React from 'react';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(3),
        paddingLeft: theme.spacing(2),
    },
    list: {
        width: '100%',
        maxWidth: 1220,
        backgroundColor: theme.palette.background.paper,
    },
    music: {
        [theme.breakpoints.down('xs')]: {
            height: theme.spacing(5),
            marginRight: theme.spacing(1),
        },

    },
    selected: {},
    paper: {
        borderRadius: '12px',
        marginBottom: theme.spacing(1),
        marginRight: theme.spacing(1),
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,

        },
    },
}))

const Songs = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography
                variant="h6">
                Songs
                </Typography>
            <List className={classes.list}>
                {props.songs.map((item, index) => (

                    <div
                        className={classes.paper}>
                        <ListItem
                            key={item}
                            classes={{ root: classes.music, selected: classes.selected }}>
                            <Typography variant='h6'>
                                {`${index + 1}.   `}
                            </Typography>
                            <ListItemText id="play-list-label-songs" primary={item} />
                            <IconButton edge="end" aria-label="music" key={item}>
                                <PlayCircleOutlineIcon key={item} />
                            </IconButton>
                        </ListItem>
                        <Divider />
                    </div>
                ))
                }
            </List>
        </div >
    )
}
Songs.defaultProps = {
    songs: [
        "Dui Rupaiyaa",
        "Kutu Ma Kutu",
        "Talkyo Jawani"
    ]
}
export default Songs;
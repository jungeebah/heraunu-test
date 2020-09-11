import React from 'react';
import PropTypes from 'prop-types';
import FilterListIcon from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import { Genre } from '../../data';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    root: {
        paddingBottom: theme.spacing(1)
    },
    filterText: {
        paddingLeft: theme.spacing(1)
    },
    shiftPaper: {
        flexGrow: 1,
        transition: theme.transitions.create(['margin', 'padding'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        margin: theme.spacing(1),
        padding: theme.spacing(6)
    },
    paper: {
        transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.complex,
        }),
        margin: theme.spacing(-5),
    },
    chipPaper: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        padding: theme.spacing(1),
        margin: 0,
    },
    chip: {
        margin: theme.spacing(0.5),
    },
}))

const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
const rangeYear = range(currentYear, currentYear - 50, -1);
const yearList = ['All', ...rangeYear];


const Filter = (props) => {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('xs'));
    const { genre, year, handleChangeYear, handleChangeGenre, handleDelete, filterChip } = props
    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item >
                    <IconButton
                        size={mobile ? 'small' : 'medium'}
                        onClick={handleChange}>
                        <FilterListIcon
                            fontSize='small' />
                        <Typography
                            className={classes.filterText}
                            varaint={mobile ? 'subtitle1' : 'body1'}>
                            Filter
                    </Typography>
                    </IconButton>
                </Grid>
                <Grid item className={classes.filterText}>
                    <div className={classes.chipPaper}>
                        {filterChip ?
                            filterChip.map((item) => <li key={item.key}>
                                <Chip
                                    color="primary"
                                    size="small"
                                    avatar={<Avatar>{item.key}</Avatar>}
                                    label={item.value}
                                    onDelete={handleDelete(item)}
                                    className={classes.chip} />
                            </li>)
                            :
                            <div></div>}
                    </div>
                </Grid>

            </Grid>

            <Grow
                in={checked}
                style={{ transformOrigin: '0 0 0' }}
                {...(checked ? { timeout: 1000 } : { timeout: 10 })}
            >
                <Paper elevation={0} className={clsx(classes.paper, {
                    [classes.shiftPaper]: checked,
                })}>
                    <Grid container spacing={2}>
                        <Grid item xs={6} sm={4} lg={1}>
                            <TextField
                                id="genre"
                                select
                                label="Genre"
                                size="small"
                                value={genre}
                                onChange={handleChangeGenre}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Movie Genre"
                                variant="outlined"
                            >
                                {Genre.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>

                        </Grid>
                        <Grid item xs={6} sm={4} lg={1}>
                            <TextField
                                id="year"

                                select
                                label="Year"
                                size="small"
                                value={year}
                                onChange={handleChangeYear}
                                SelectProps={{
                                    native: true,
                                }}
                                helperText="Movie Year"
                                variant="outlined"
                            >
                                {yearList.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Paper>
            </Grow>
            <Divider />
        </div>
    )
}

Filter.propsType = {
    genre: PropTypes.string,
    year: PropTypes.string,
    handleChangeYear: PropTypes.func,
    handleChangeGenre: PropTypes.func,
    handleDelete: PropTypes.func,
    filterChip: PropTypes.array
}
Filter.defaultProps = {
    genre: 'All',
    year: 'All',
    filterChip: [],
    handleChangeYear: () => { },
    handleChangeGenre: () => { },
    handleDelete: () => { }
}

export default Filter;

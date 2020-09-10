import React from 'react';
import FilterListIcon from '@material-ui/icons/FilterList';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField'
import { Genre } from '../../data'

const useStyles = makeStyles((theme) => ({
    filterText: {
        paddingLeft: theme.spacing(1)
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(1),
        padding: theme.spacing(2, 2, 2, 2)
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 90,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

const currentYear = (new Date()).getFullYear();
const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
const rangeYear = range(currentYear, currentYear - 50, -1);

const Filter = () => {
    const [genre, setGenre] = React.useState('');
    const [year, setYear] = React.useState(2020);
    const handleChangeGenre = (event) => {
        setGenre(event.target.value);
    };
    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };
    const [checked, setChecked] = React.useState(false);
    const handleChange = () => {
        setChecked((prev) => !prev);
    };
    const classes = useStyles()
    return (
        <div>
            <Grid container spacing={1}>
                <Grid item >
                    <IconButton
                        onClick={handleChange}>
                        <FilterListIcon />
                        <Typography className={classes.filterText}>
                            Filter
                    </Typography>
                    </IconButton>
                </Grid>
            </Grid>
            <Divider />
            <Grow
                in={checked}
                style={{ transformOrigin: '0 0 0' }}
                {...(checked ? { timeout: 1000 } : {})}
            >
                <Paper elevation={0} className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-select-currency-native"
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
                        <Grid item xs={6}>
                            <TextField
                                id="outlined-select-currency-native"
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
                                {rangeYear.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Paper>
            </Grow>
        </div>
    )
}

export default Filter;

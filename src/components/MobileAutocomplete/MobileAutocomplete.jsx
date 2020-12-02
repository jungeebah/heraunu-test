import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { autoComplete } from "../../data";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { useSelector } from 'react-redux';
import { allmovieSelector } from '../../slice/allMovieSlice'
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(
  (theme) => ({
    paper: {
      width: "100 %",
      backgroundColor: theme.palette.primary.main,
    },
    input: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.87em",
      },
    },
    grid: {
      padding: theme.spacing(1, 1, 1, 1),
    },
    listbox: {
      [theme.breakpoints.down("xs")]: {
        maxHeight: "17vh",
      },
    },
    groupUl: {
      [theme.breakpoints.down("xs")]: {
        margin: "0.1em 0",
      },
    },
    option: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.8rem",
        minHeight: "30px",
      },
    },
  }),
  { name: "MuiAutocomplete" }
);

const MobileAutocomplete = (props) => {
  const autoCompleteState = useSelector(allmovieSelector);
  const [autoComplete, setAutoComplete] = React.useState([]);
  React.useEffect(() => { setAutoComplete(autoCompleteState.allmovies) },
    [autoCompleteState])
  const { searchFilter } = props;
  const classes = useStyles();
  const defaultProps = {
    options: autoComplete,
    getOptionLabel: (option) => option.name,
  };
  const selected = (e, v) => {
    setOpenLabel(false);
    if (v) {
      searchFilter(v.name, v.item);
    }
  };
  const [openLabel, setOpenLabel] = React.useState(false);
  return (
    <Paper className={classes.paper}>
      <Grid container className={classes.grid}>
        <Grid item xs={10}>
          <Autocomplete
            classes={{
              listbox: classes.listbox,
              groupUl: classes.groupUl,
              input: classes.input,
            }}
            {...defaultProps}
            open={openLabel}
            id="search-box"
            onChange={selected}
            // options={autoComplete.sort((a, b) => -b.item.localeCompare(a.item))}
            groupBy={(option) => option.item}
            getOptionLabel={(option) => option.name}
            clearOnEscape
            onClose={(e, r) => {
              setOpenLabel(false);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search"
                variant="outlined"
                color="secondary"
                size="small"
                onChange={(e) => {
                  e.target.value === ""
                    ? setOpenLabel(false)
                    : setOpenLabel(true);
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={props.handleChange}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MobileAutocomplete;

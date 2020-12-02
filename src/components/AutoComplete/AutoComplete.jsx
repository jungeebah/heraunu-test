import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector } from 'react-redux';
import { allmovieSelector } from '../../slice/allMovieSlice'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  (theme) => ({
    input: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "0.87em",
      },
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

const AutoComplete = (props) => {
  const autoCompleteState = useSelector(allmovieSelector);
  const [autoComplete, setAutoComplete] = React.useState([]);
  const { searchFilter } = props;
  const classes = useStyles();
  React.useEffect(() => { setAutoComplete(autoCompleteState.allmovies) },
    [autoCompleteState])
  console.log(autoComplete[0], autoCompleteState)
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
  const { width } = props;
  const [openLabel, setOpenLabel] = React.useState(false);
  return (
    <div style={{ width: width }}>
      <Autocomplete
        classes={{
          option: classes.option,
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
              e.target.value === "" ? setOpenLabel(false) : setOpenLabel(true);
            }}
          />
        )}
      />
    </div>
  );
};

AutoComplete.defaultProps = {
  width: 300,
};

export default AutoComplete;

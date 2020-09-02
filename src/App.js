import React, { useState } from 'react';
import Header from './components/Header/Header';
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';
import Body from './components/Body/Body';

const useStyles = makeStyles(() => ({
  grid: {
    width: '100%',
    margin: '0px'

  }
}));

function App() {
  const dark = createMuiTheme({
    palette: {
      type: "dark",

    }
  })
  const light = createMuiTheme({
    palette: {

      common: {
        black: "#000",
        white: "#fff"
      },
      background: {
        paper: "#fff",
        default: "#fafafa"
      },
      primary: {
        light: "#7986cb",
        main: "rgba(74, 144, 226, 1)",
        dark: "rgba(29, 29, 32, 1)",
        contrastText: "#fff"
      },
      secondary: {
        light: "#ff4081",
        main: "rgba(80, 227, 194, 1)",
        dark: "#c51162",
        contrastText: "#fff"
      },
      error: {
        light: "#e57373",
        main: "#f44336",
        dark: "#d32f2f",
        contrastText: "#fff"
      },
      text: {
        primary: "rgba(0, 0, 0, 1)",
        secondary: "rgba(0, 0, 0, 0.54)",
        disabled: "rgba(0, 0, 0, 0.38)",
        hint: "rgba(0, 0, 0, 0.38)"
      }
    }
  })
  const [darkTheme, setDarkTheme] = useState(false);
  const classes = useStyles();
  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme)
  }
  return (
    < ThemeProvider theme={darkTheme ? dark : light} >
      <Grid container className={classes.grid} >
        <Grid item xs={12} >
          <Header
            handleChangeTheme={handleChangeTheme}
            theme={darkTheme} />
        </Grid>
        <Grid item xs={12} >
          <Paper variant="outlined" square>
            <Body />
          </Paper>
        </Grid>
      </Grid>

    </ThemeProvider>
  );
}

export default App;

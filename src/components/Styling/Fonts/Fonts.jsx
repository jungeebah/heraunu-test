import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  typo: {
    paddingBottom: theme.spacing(1),
    marginLeft: theme.spacing(3),
  },
}));

const Fonts = () => {
  const theme = useTheme();
  const classes = useStyles();
  const font = Object.keys(theme.typography).filter(
    (item) => typeof theme.typography[item] === "object"
  );
  return (
    <div>
      <Paper>
        {font.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Typography variant={item} key={item} className={classes.typo}>
              {item}
            </Typography>
          </Grid>
        ))}
      </Paper>
    </div>
  );
};

export default Fonts;

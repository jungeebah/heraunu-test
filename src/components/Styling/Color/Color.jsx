import { Typography, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() => ({
    Title: {
        textAlign: 'left',

    }
}));

const Palette = (props) => {
    const { palette } = props;
    const classes = useStyles();
    const colo = palette.map((item, index) => {
        let title = Object.entries(item)[0][0]
        let value = Object.entries(item)[0][1]
        let colorTitle = Object.keys(value)
        let colorItem = colorTitle.map((i, index) => (
            <Grid item xs={12} sm={2} key={index + i}>
                <Box
                    bgcolor={value[i]}
                    color="primary.contrastText"
                    p={10}
                    elevation={3}
                    boxShadow={10}
                    width="25%"
                >

                </Box>
                <Typography>{i}</Typography>
                <Box m="2rem" key={i} />
            </Grid >
        ))
        return (
            <div key={index}>
                <Box m="2rem" key={`box${item}`}>
                    <Typography className={classes.Title}
                        key={`${index}Typo`}
                        fontSize={32}
                        variant={'h5'}
                    >
                        {title}
                    </Typography>
                    <Grid container spacing={2} key={index + item}>

                        {colorItem}
                        <Box m="2rem" key={index} />
                    </Grid>
                </Box>
            </div>
        )
    })

    return (
        <div>
            {colo}
        </div>
    );
}

Palette.defaultProps = {
    palette: [
        {
            "common": {
                "black": "#000",
                "white": "#fff"
            }
        },
        {
            "background": {
                "paper": "#fff",
                "default": "#fafafa"
            }
        },
        {
            "primary": {
                "light": "#7986cb",
                "main": "rgba(74, 144, 226, 1)",
                "dark": "rgba(29, 29, 32, 1)",
                "contrastText": "#fff"
            }
        },
        {
            "secondary": {
                "light": "#ff4081",
                "main": "rgba(80, 227, 194, 1)",
                "dark": "#c51162",
                "contrastText": "#fff"
            }
        },
        {
            "error": {
                "light": "#e57373",
                "main": "#f44336",
                "dark": "#d32f2f",
                "contrastText": "#fff"
            }
        },
        {
            "text": {
                "primary": "rgba(0, 0, 0, 1)",
                "secondary": "rgba(0, 0, 0, 0.54)",
                "disabled": "rgba(0, 0, 0, 0.38)",
                "hint": "rgba(0, 0, 0, 0.38)"
            }
        }
    ]
}

export default Palette;
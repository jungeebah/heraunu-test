import React from 'react';
import { AppBar, Toolbar } from '@material-ui/core'

const Header = (props) => {
    return (
        <div>
            <AppBar position="static" >
                <Toolbar>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;
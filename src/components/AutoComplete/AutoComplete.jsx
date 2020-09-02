import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { autoComplete } from '../../data'


const AutoComplete = () => {
    const defaultProps = {
        options: autoComplete,
        getOptionLabel: (option) => option.title,
    };
    const [openLabel, setOpenLabel] = React.useState(false);
    return (
        <div style={{ width: 300 }}>
            <Autocomplete
                {...defaultProps}
                open={openLabel}
                id="search-box"
                onChange = {(e,v)=> {setOpenLabel(false)}}
                options={autoComplete.sort((a, b) => -b.item.localeCompare(a.item))}
                groupBy={(option) => option.item}
                getOptionLabel={(option) => option.title}
                clearOnEscape
                renderInput={(params) => <TextField
                    {...params}
                    label="Search" variant="outlined"
                    color="secondary"
                    size="small"
                    onChange={(e) => {
                        e.target.value === '' ? setOpenLabel(false) : setOpenLabel(true)
                    }}
                />
                }
            />
        </div >
    );
}

export default AutoComplete;
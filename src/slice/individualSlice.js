import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = process.env.REACT_APP_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const initialState = {
    movie: null,
    id: 0,
    status: 'idle',
    error: null
}


export const getIndividualMovie = createAsyncThunk('movie/getIndividualMovie',
    (movieId) => {
        return fetch(`http://localhost:8000/api/movies/${movieId}`, requestOptions)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then(json => json)
    })


export const individualSlice = createSlice({
    name: 'individual',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getIndividualMovie.pending]: state => {
            state.status = 'loading'
        },
        [getIndividualMovie.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.movies = action.payload
        },
        [getIndividualMovie.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
    }
})

export const individualMovie = state => state.individualMovie

export default individualMovie.reducer;
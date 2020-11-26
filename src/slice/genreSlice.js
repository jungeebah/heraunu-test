import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = process.env.REACT_APP_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const initialState = {
    url: 0,
    name: '',
    movies: [],
    status: 'idle',
    error: null
}

export const getGenre = createAsyncThunk('movie/getGenre',
    (genreID) => {
        return fetch(`https://healthy-system-267921.uc.r.appspot.com/api/genres/${genreID}`, requestOptions)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then(json => json)
    })


export const genreSlice = createSlice({
    name: 'genre',
    initialState,
    reducers: {
        invalidateGenre: state => {
            return initialState
        }
    },
    extraReducers: {
        [getGenre
            .pending]: state => {
                state.status = 'loading'
            },
        [getGenre
            .fulfilled]: (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                state.url = action.payload.url
                state.name = action.payload.name
                // state.image = action.payload.image
                // state.page = state.page.concat({ 'x': action.payload.page, y: action.payload.results.length })
                state.movies = action.payload.movies
            },
        [getGenre
            .rejected]: (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            },
    }
})

export const genreSelector = state => state.genre
export const { invalidateGenre } = genreSlice.actions

export default genreSlice.reducer;



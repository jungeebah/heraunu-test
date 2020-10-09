import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = process.env.REACT_APP_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const initialState = {
    count: 0,
    next: null,
    previous: null,
    movies: [],
    status: 'idle',
    error: null
}

export const getYoutubeMovies = createAsyncThunk('movie/getYoutubeMovies',
    (endpoint) => {
        return fetch(`https://healthy-system-267921.uc.r.appspot.com/api/youtubes/?page=${endpoint}`, requestOptions)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then(json => json)
    })


export const youtubeSlice = createSlice({
    name: 'youtube',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getYoutubeMovies.pending]: state => {
            state.status = 'loading'
        },
        [getYoutubeMovies.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            state.count = action.payload.count
            state.next = action.payload.next
            state.previous = action.payload.previous
            state.movies = action.payload.results
        },
        [getYoutubeMovies.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.payload
        },
    }
})

export const youtubeSelector = state => state.youtubeMovies

export default youtubeSlice.reducer;



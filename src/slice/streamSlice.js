import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = process.env.REACT_APP_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const initialState = {
    movies: [],
    status: 'idle',
    error: null
}

export const getStream = createAsyncThunk('movie/getStream',
    async () => {
        const response = await fetch('https://healthy-system-267921.uc.r.appspot.com/api/streamings', requestOptions);
        if (!response.ok)
            throw Error(response.statusText);
        const json = await response.json();
        return json;
    })


export const streamSlice = createSlice({
    name: 'stream',
    initialState,
    reducers: {
        invalidateStream: state => {
            return initialState
        }
    },
    extraReducers: {
        [getStream
            .pending]: state => {
                state.status = 'loading'
            },
        [getStream
            .fulfilled]: (state, action) => {
                state.status = 'succeeded'
                // Add any fetched posts to the array
                // state.page = state.page.concat({ 'x': action.payload.page, y: action.payload.results.length })
                state.movies = action.payload.results.reduce((a, b) => a.concat(b.movies), [])
            },
        [getStream
            .rejected]: (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            },
    }
})

export const streamSelector = state => state.stream
export const { invalidateStream } = streamSlice.actions

export default streamSlice.reducer;



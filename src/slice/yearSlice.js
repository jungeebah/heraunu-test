import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const token = process.env.REACT_APP_Token

var myHeaders = new Headers();
myHeaders.append("Authorization", `Token ${token}`);

var requestOptions = {
    method: 'GET',
    headers: myHeaders,
};

const initialState = {
    year: 0,
    count: 0,
    next: null,
    previous: null,
    page: [],
    movies: [],
    status: 'idle',
    error: null
}

export const getYear = createAsyncThunk('movie/getYear',
    (year) => {
        initialState.year = year
        return fetch(`https://healthy-system-267921.uc.r.appspot.com/api/movies/?release_date=${year}&genre=`, requestOptions)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json()
            })
            .then(json => json)
    })


export const yearSlice = createSlice({
    name: 'year',
    initialState,
    reducers: {
        invalidateYear: state => {
            return initialState
        }
    },
    extraReducers: {
        [getYear
            .pending]: state => {
                state.status = 'loading'
            },
        [getYear
            .fulfilled]: (state, action) => {
                state.status = 'succeeded'
                state.year = initialState.year
                // Add any fetched posts to the array
                state.count = action.payload.count
                state.next = action.payload.next
                state.previous = action.payload.previous
                state.page = state.page.concat({ 'x': action.payload.page, y: action.payload.results.length })
                state.movies = action.payload.results
            },
        [getYear
            .rejected]: (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            },
    }
})

export const yearSelector = state => state.year
export const { invalidateYear } = yearSlice.actions

export default yearSlice.reducer;



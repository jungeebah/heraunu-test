import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../slice/movieSlice';
import individualMovieReducer from '../slice/individualSlice'

export default configureStore({
    reducer: {
        movies: movieReducer,
        individualMovie: individualMovieReducer,
    },
});

import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../slice/movieSlice';
import youtubeReducer from '../slice/youtubeSlice'
import individualMovieReducer from '../slice/individualSlice'

export default configureStore({
    reducer: {
        movies: movieReducer,
        individualMovie: individualMovieReducer,
        youtubeMovies: youtubeReducer,
    },
});

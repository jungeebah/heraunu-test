import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../slice/movieSlice';
import youtubeReducer from '../slice/youtubeSlice'
import individualMovieReducer from '../slice/individualSlice'
import actorReducer from '../slice/actorSlice'
import genreReducer from '../slice/genreSlice'

export default configureStore({
    reducer: {
        movies: movieReducer,
        individualMovie: individualMovieReducer,
        youtubeMovies: youtubeReducer,
        actor: actorReducer,
        genre: genreReducer,
    },
});

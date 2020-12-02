import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../slice/movieSlice';
import youtubeReducer from '../slice/youtubeSlice'
import individualMovieReducer from '../slice/individualSlice'
import actorReducer from '../slice/actorSlice'
import genreReducer from '../slice/genreSlice'
import yearReducer from '../slice/yearSlice'
import streamReducer from '../slice/streamSlice'

export default configureStore({
    reducer: {
        movies: movieReducer,
        individualMovie: individualMovieReducer,
        youtubeMovies: youtubeReducer,
        actor: actorReducer,
        genre: genreReducer,
        year: yearReducer,
        stream: streamReducer
    },
});

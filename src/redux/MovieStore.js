// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './MovieSlice';
import randomMovieReducer from './RandomMovieSlice';
import movieDetailReducer from './MovieDetailSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    randomMovie: randomMovieReducer,
    movieDetails: movieDetailReducer,
  },
});

export default store;

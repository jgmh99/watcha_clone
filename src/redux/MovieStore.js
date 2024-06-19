// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './MovieSlice';
import randomMovieReducer from './RandomMovieSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    randomMovie: randomMovieReducer,
  },
});

export default store;

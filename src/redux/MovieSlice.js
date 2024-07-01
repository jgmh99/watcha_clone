import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

// 비동기 thunk 생성
export const fetchPopularMovies = createAsyncThunk(
  'movies/fetchPopularMovies',
  async (page = 1) => {
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`);
    return {
      movies: response.data.results,
      page,
      totalPages: response.data.total_pages
    };
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    page: 1,
    totalPages: 1,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const newMovies = action.payload.movies.filter(movie => !state.movies.some(existingMovie => existingMovie.id === movie.id));
        state.movies = [...state.movies, ...newMovies];
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPopularMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default moviesSlice.reducer;

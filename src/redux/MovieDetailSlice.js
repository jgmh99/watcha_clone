import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchMovieDetails = createAsyncThunk(
  'movieDetails/fetchMovieDetails',
  async (movieId) => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`);
      return response.data;
    } catch (error) {
      throw Error('Failed to fetch movie details');
    }
  }
);

const movieDetailSlice = createSlice({
  name: 'movieDetails',
  initialState: {
    movie: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default movieDetailSlice.reducer;

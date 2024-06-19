// src/features/movies/randomMovieSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

// 비동기 thunk 생성
export const fetchRandomMovie = createAsyncThunk(
  'randomMovie/fetchRandomMovie',
  async () => {
    try {
      const page = Math.floor(Math.random() * 500) + 1; // 랜덤 페이지 번호 (1부터 500까지)
      const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`);
      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];

      const movieDetails = await axios.get(`${BASE_URL}/movie/${randomMovie.id}?api_key=${API_KEY}&language=ko-KR`);
      const movieVideos = await axios.get(`${BASE_URL}/movie/${randomMovie.id}/videos?api_key=${API_KEY}`);

      // 첫 번째 유튜브 예고편 가져오기
      const trailer = movieVideos.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');

      return {
        title: movieDetails.data.title,
        tagline: movieDetails.data.tagline,
        trailer: trailer ? trailer.key : null // 유튜브 비디오 ID
      };
    } catch (error) {
      console.error('Error fetching random movie:', error);
      throw error;
    }
  }
);

const randomMovieSlice = createSlice({
  name: 'randomMovie',
  initialState: {
    movie: {
      title: '',
      tagline: '',
      trailer: ''
    },
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandomMovie.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRandomMovie.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movie = action.payload;
      })
      .addCase(fetchRandomMovie.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default randomMovieSlice.reducer;

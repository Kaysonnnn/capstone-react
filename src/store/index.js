import { configureStore } from '@reduxjs/toolkit';
import listMovieSlice from './../pages/HomeTemplate/ListMoviePage/slice.js';

export const store = configureStore({
  reducer: {
    listMovieSlice,
  },
});

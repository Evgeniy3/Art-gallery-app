import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Authors, AuthorsSliceState } from './types';
import { Status } from '../artSlice/types';

export const fetchAuthors = createAsyncThunk<Authors[]>('authors/fetchArtsStatus', async () => {
  const { data } = await axios.get<Authors[]>(`${process.env.REACT_APP_API_URL}authors`);
  return data;
});

const initialState: AuthorsSliceState = {
  authors: [],
  status: Status.LOADING,
};

export const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthors.pending, (state) => {
      state.status = Status.LOADING;
      state.authors = [];
    });
    builder.addCase(fetchAuthors.fulfilled, (state, action) => {
      state.authors = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchAuthors.rejected, (state) => {
      state.authors = [];
      state.status = Status.ERROR;
    });
  },
});

export const authorsSelect = (state: RootState) => state.authorsReducer;

export default authorsSlice.reducer;

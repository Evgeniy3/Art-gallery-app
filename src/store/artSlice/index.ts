import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import {
  Art, ArtsSliceState, SearchArtParams, Status,
} from './types';

export const fetchArts = createAsyncThunk<Art[], SearchArtParams>('art/fetchArtsStatus', async (params) => {
  const {
    search, currentPage, currentAuthor, currentLocation, currentCreatedFrom, currentCreatedBefore,
  } = params;
  const { data } = await axios.get<Art[]>(`${process.env.REACT_APP_API_URL}paintings`, {
    params: {
      _page: currentPage,
      _limit: 12,
      q: search,
      ...(currentAuthor ? { authorId: currentAuthor } : {}),
      ...(currentLocation ? { locationId: currentLocation } : {}),
      ...(currentCreatedFrom ? { created_gte: currentCreatedFrom } : {}),
      ...(currentCreatedBefore ? { created_lte: currentCreatedBefore } : {}),
    },
  });
  return data;
});

const initialState: ArtsSliceState = {
  items: [],
  status: Status.LOADING,
};

export const artSlice = createSlice({
  name: 'art',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArts.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchArts.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchArts.rejected, (state) => {
      state.items = [];
      state.status = Status.ERROR;
    });
  },
});

export const artSelect = (state: RootState) => state.artReducer;

export default artSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Locations, LocationsSliceState } from './types';
import { Status } from '../artSlice/types';

export const fetchLocations = createAsyncThunk<Locations[]>('locations/fetchArtsStatus', async () => {
  const { data } = await axios.get<Locations[]>(`${process.env.REACT_APP_API_URL}locations`);
  return data;
});

const initialState: LocationsSliceState = {
  locations: [],
  status: Status.LOADING,
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLocations.pending, (state) => {
      state.status = Status.LOADING;
      state.locations = [];
    });
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.locations = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchLocations.rejected, (state) => {
      state.locations = [];
      state.status = Status.ERROR;
    });
  },
});

export const locationsSelect = (state: RootState) => state.locationsReducer;

export default locationsSlice.reducer;

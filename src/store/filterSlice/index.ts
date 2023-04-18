import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { FilterSliceState } from './types';

const initialState: FilterSliceState = {
  searchValue: '',
  currentPage: 1,
  authorId: '',
  locationId: '',
  createdFrom: '',
  createdBefore: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setAuthorId: (state, action: PayloadAction<string>) => {
      state.authorId = action.payload;
    },
    setlocationId: (state, action: PayloadAction<string>) => {
      state.locationId = action.payload;
    },
    setCreatedFrom: (state, acrion: PayloadAction<string>) => {
      state.createdFrom = acrion.payload;
    },
    setCreatedBefore: (state, acrion: PayloadAction<string>) => {
      state.createdBefore = acrion.payload;
    },
  },
});

export const filterSelect = (state: RootState) => state.filterReducer;

export const {
  setCurrentPage, setSearchValue, setAuthorId, setlocationId, setCreatedFrom, setCreatedBefore,
} = filterSlice.actions;

export default filterSlice.reducer;

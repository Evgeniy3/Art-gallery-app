import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import artReducer from './artSlice';
import authorsReducer from './authorSlice';
import locationsReducer from './locationSlice';
import filterReducer from './filterSlice';

export const store = configureStore({
  reducer: {
    artReducer,
    authorsReducer,
    locationsReducer,
    filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

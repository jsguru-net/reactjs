import { configureStore } from '@reduxjs/toolkit';
import bookmarkReducer from './bookmark-manager/bookmarkSlice';
import counterReducer from '../features/counter/counterSlice';

export default configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    counter: counterReducer,
  },
});

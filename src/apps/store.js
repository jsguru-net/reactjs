import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import bookmarkReducer from './bookmark-manager/bookmarkSlice';
import counterReducer from '../features/counter/counterSlice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSagaMiddleware();

export default configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    counter: counterReducer,
  },
  middleware: () => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

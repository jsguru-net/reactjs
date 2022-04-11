import { all } from 'redux-saga/effects';
import helloSaga from './bookmark-manager/bookmark.saga';

export default function* rootSaga() {
  yield all([helloSaga()]);
  // code after all-effect
}

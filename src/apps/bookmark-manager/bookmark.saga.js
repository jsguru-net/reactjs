import { call, put, takeEvery } from 'redux-saga/effects';
import { getBookmarkItems } from './bookmarkApi';
function* helloHandler(action) {
  console.log('hello saga', action);
  yield put({ type: 'bookmark/fetchBookmark/pending' });
  const res = yield call(
    getBookmarkItems,
    action.payload.page,
    action.payload.itemsPerPage
  );
  console.log('res', res);
  yield put({
    type: 'bookmark/fetchBookmark/fulfilled',
    payload: {
      ...res.data,
    },
  });
}

function* helloSaga() {
  yield takeEvery('HELLO_SAGA', helloHandler);
}

export default helloSaga;

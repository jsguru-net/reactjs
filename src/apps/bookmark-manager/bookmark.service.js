import store from '../store';
export default {
  dispatchAction(type, payload) {
    store.dispatch({ type, payload });
  },
  getState(key) {
    return store.getState()[key];
  },
};

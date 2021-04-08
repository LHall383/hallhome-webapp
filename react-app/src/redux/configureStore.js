import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watcherSaga } from './sagas/rootSaga';

import pulicUserReducer from './ducks/publicUserDuck';
import privateUserReducer from './ducks/privateUserDuck';

const reducer = combineReducers({
  publicUser: pulicUserReducer,
  privateUser: privateUserReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});
sagaMiddleware.run(watcherSaga);

export default store;

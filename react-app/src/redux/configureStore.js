import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { watcherSaga } from './sagas/rootSaga';

import authorizationReducer from './ducks/authorizationDuck';
import pulicUserReducer from './ducks/publicUserDuck';
import privateUserReducer from './ducks/privateUserDuck';
import personalizationReducer from './ducks/personalizationDuck';
import playerReducer from './ducks/playerDuck';

const reducer = combineReducers({
  authorization: authorizationReducer,
  publicUser: pulicUserReducer,
  privateUser: privateUserReducer,
  personalization: personalizationReducer,
  player: playerReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware],
});
sagaMiddleware.run(watcherSaga);

export default store;

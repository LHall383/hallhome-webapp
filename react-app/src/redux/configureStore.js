import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import pulicUserReducer from './ducks/publicUser';
import { watcherSaga } from './sagas/rootSaga';

const reducer = combineReducers({
  publicUser: pulicUserReducer,
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middleware));

sagaMiddleware.run(watcherSaga);

export default store;

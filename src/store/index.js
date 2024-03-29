import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { reducer } from './reducers';
// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
// );
// export default store;

const rootReducer = combineReducers({
  user: reducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

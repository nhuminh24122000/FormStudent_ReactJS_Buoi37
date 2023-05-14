import { createStore, combineReducers } from "redux";
import { StudentReducer } from './reducers/StudentReducer'

const rootReducer = combineReducers({
  StudentReducer: StudentReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

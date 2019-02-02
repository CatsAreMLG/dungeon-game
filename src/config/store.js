import { createStore, combineReducers } from "redux";
import playerReducer from "../features/player/reducer";

const rootReducer = combineReducers({
  player: playerReducer
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

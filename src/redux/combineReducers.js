import { combineReducers } from "redux";
import { userReducer } from '../reducers/index'

export default asyncReducers =>
  combineReducers({
    ...asyncReducers,
    userReducer,
  });

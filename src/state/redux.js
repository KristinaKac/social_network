import { applyMiddleware, combineReducers, createStore } from "redux";
import messengerReducer from "./messengerReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import { thunk as thunkMiddleWare } from 'redux-thunk';
import appReducer from "./appReducer";

let reducers = combineReducers({
    messengerPage: messengerReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;
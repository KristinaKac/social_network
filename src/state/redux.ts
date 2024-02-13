import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux";
import messengerReducer from "./messengerReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import { ThunkAction, thunk as thunkMiddleWare } from 'redux-thunk';
import appReducer from "./appReducer";

type ReducersType = typeof reducers;
export type StateType = ReturnType<ReducersType>;


let reducers = combineReducers({
    messengerPage: messengerReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
});

export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, StateType, unknown, A>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(compose(applyMiddleware(thunkMiddleWare)))
  );
// const store = createStore(reducers, applyMiddleware(thunkMiddleWare));


export default store;


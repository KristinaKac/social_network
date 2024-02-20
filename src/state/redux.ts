import { Action, AnyAction, applyMiddleware, combineReducers, compose, createStore } from "redux";
import messengerReducer from "./messengerReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import { ThunkAction, ThunkDispatch, thunk as thunkMiddleWare } from 'redux-thunk';
import appReducer from "./appReducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { chatReducer } from "./chatReducer";

type ReducersType = typeof reducers;
export type StateType = ReturnType<ReducersType>;


let reducers = combineReducers({
    messengerPage: messengerReducer,
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    chatPage: chatReducer
});

export type InferActionType<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never;

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, StateType, unknown, A>;

export type AppDispatch = ThunkDispatch<StateType, any, AnyAction>;

export const useTypedSelector: TypedUseSelectorHook<StateType> = useSelector;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    composeEnhancers(compose(applyMiddleware(thunkMiddleWare)))
  );
// const store = createStore(reducers, applyMiddleware(thunkMiddleWare));


export default store;


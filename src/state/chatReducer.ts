import { Dispatch } from "redux";
import { chatApi } from "../api/chat-api";
import { BaseThunkType, InferActionType } from "./redux";
import {v1} from 'uuid';

const initialValue = {
    messages: [] as ChatWithIdType[],
    status: 'pending' as StatusType,
}
type InitialValueType = typeof initialValue;

type ChatWithIdType = ChatMessagesType & {id: string}

export const chatReducer = (state = initialValue, action: ActionType): InitialValueType => {
    switch (action.type) {
        case 'RECEIVED_MESSAGES':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1() }))]
                .filter((m, index, array) => index >= array.length - 100),
            }
        case 'STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status,
            }
        default:
            return state;
    }
}

type ActionType = InferActionType<typeof actions>;
type ThunkType = BaseThunkType<ActionType>;

export const actions = {
    receivedMessages: (messages: ChatMessagesType[]) => ({ type: 'RECEIVED_MESSAGES', payload: { messages } } as const),
    statusChanged: (status: StatusType) => ({ type: 'STATUS_CHANGED', payload: { status } } as const),
}
let _newMessageHandler: ((messages: ChatMessagesType[]) => void) | null = null;
let _newStatusHandler: ((status: StatusType) => void) | null = null;

const newMessageHandler = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.receivedMessages(messages));
        }
    }
    return _newMessageHandler;
}
const newStatusHandler = (dispatch: Dispatch) => {
    if (_newStatusHandler === null) {
        _newStatusHandler = (status) => {
            dispatch(actions.statusChanged(status));
        }
    }
    return _newStatusHandler;
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.start();
    chatApi.subscribe('message-received', newMessageHandler(dispatch));
    chatApi.subscribe('status-changed', newStatusHandler(dispatch));
}
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatApi.unsubscribe('message-received', newMessageHandler(dispatch));
    chatApi.unsubscribe('status-changed', newStatusHandler(dispatch));
    chatApi.close();
}
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatApi.sendMessage(message);
}

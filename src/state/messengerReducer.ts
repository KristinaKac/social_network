import { InferActionType } from "./redux";

const initialValue = {
    contacts: [
        { id: 1, name: "Ирина" },
        { id: 2, name: "Влад" },
        { id: 3, name: "Ольга" },
        { id: 4, name: "Олег" },
        { id: 5, name: "Дарья" },
    ] as Array<ContactsType>,
    dialogs: [
        { id: 1, message: "Hi!" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Hello" },
        { id: 4, message: "My name is ..." },
    ] as Array<DialogsType>,
}

const messengerReducer = (state = initialValue, action: ActionType): InitialValueType => {

    switch (action.type) {
        case 'SEND_MESSAGE':
            const newMessage = {
                id: 1,
                message: action.text
            }
            return {
                ...state,
                dialogs: [...state.dialogs, newMessage]
            }
        default:
            return state;
    }
}

export const actions = {
    sendMessage: (text: string) => ({ type: 'SEND_MESSAGE', text } as const),
}


export default messengerReducer;

type InitialValueType = typeof initialValue;
type ActionType = InferActionType<typeof actions>;
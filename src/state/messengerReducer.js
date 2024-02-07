const ADD_MESSAGE = 'ADD_MESSAGE';
const CHANGE_TEXTAREA_MESSAGE = 'CHANGE_TEXTAREA_MESSAGE';

const initialValue =
{
    contacts: [
        { id: 1, name: "Ирина" },
        { id: 2, name: "Влад" },
        { id: 3, name: "Ольга" },
        { id: 4, name: "Олег" },
        { id: 5, name: "Дарья" },
    ],
    dialogs: [
        { id: 1, message: "Hi!" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Hello" },
        { id: 4, message: "My name is ..." },
    ],
    textAreaNewMessage: 'hello',
}

const messengerReducer = (state = initialValue, action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            const newMessage = {
                id: 1,
                message: state.textAreaNewMessage
            }
            return {
                ...state,
                dialogs: [...state.dialogs, newMessage]
            }
        case CHANGE_TEXTAREA_MESSAGE:
            return {
                ...state,
                textAreaNewMessage: action.text,
            }
        default:
            return state;
    }
}
export const addMessageCreator = () => ({ type: ADD_MESSAGE });
export const changeTextareaMessageCreator = (text) => ({ type: CHANGE_TEXTAREA_MESSAGE, text: text });

export default messengerReducer;
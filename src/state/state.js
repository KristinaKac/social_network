import avatar from '../img/avatar.png';
import profileReducer from './profileReducer';
import messengerReducer from './messengerReducer';


const store = {
    _state: {
        messengerPage: {
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
        },
        profilePage: {
            posts: [
                { id: 1, avatar: avatar, text: 'hi' },
                { id: 2, avatar: avatar, text: 'My name is Kristina' },
            ],
            textAreaNewPost: 'hello',
        }
    },
    _redrawTree() { },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._redrawTree = observer;
    },
    dispatch(action) {
        this.getState().profilePage = profileReducer(this.getState().profilePage, action);
        this.getState().messengerPage = messengerReducer(this.getState().messengerPage, action);

        this._redrawTree(this.getState());
    }
}

export default store;
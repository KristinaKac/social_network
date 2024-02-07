import { authThunk } from "./authReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialValue = {
    initialized: false
}
const appReducer = (state = initialValue, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const setInitializedSuccess = () => ({ type: INITIALIZED_SUCCESS })

export const initializedThunk = () => {
    return (dispatch) => {
        const promise = dispatch(authThunk());
        promise.then(() => {
                dispatch(setInitializedSuccess());
            });
            
    }
}
export default appReducer;
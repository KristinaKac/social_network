import { authThunk } from "./authReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialValue = {
    initialized: false
}
type InitialValueType = typeof initialValue;

const appReducer = (state = initialValue, action: any):InitialValueType => {
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

type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}

export const setInitializedSuccess = (): InitializedSuccessType => ({ type: INITIALIZED_SUCCESS })

export const initializedThunk = () => {
    return (dispatch: any) => {
        const promise = dispatch(authThunk());
        promise.then(() => {
                dispatch(setInitializedSuccess());
            });
            
    }
}
export default appReducer;
import { authThunk } from "./authReducer";
import { BaseThunkType, InferActionType } from "./redux";

const initialValue = {
    initialized: false
}

const appReducer = (state = initialValue, action: ActionType): InitialValueType => {
    switch (action.type) {
        case 'INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state;
    }
}

export const actions = {
    setInitializedSuccess: () => ({ type: 'INITIALIZED_SUCCESS' }),
}
export const initializedThunk = (): ThunkType => async (dispatch) => {
    const promise = dispatch(authThunk());
    await promise.then(() => {
        dispatch(actions.setInitializedSuccess());
    });
}

export default appReducer;

type InitialValueType = typeof initialValue;
type ActionType = InferActionType<typeof actions>;
type ThunkType = BaseThunkType<ActionType>;
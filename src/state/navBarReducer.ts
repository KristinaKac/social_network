import { BaseThunkType, InferActionType } from "./redux";

const initialValue = {
    mobileMenuActive: false
}

const navBarReducer = (state = initialValue, action: ActionType): InitialValueType => {
    switch (action.type) {
        case 'SET_MOBILE_MENU_ACTIVE':
            return {
                ...state,
                mobileMenuActive: action.status
            }
        default:
            return state;
    }
}

export const actions = {
    setMobileMenuActive: (status: boolean) => ({ type: 'SET_MOBILE_MENU_ACTIVE', status }),
}

export default navBarReducer;

type InitialValueType = typeof initialValue;
type ActionType = InferActionType<typeof actions>;
type ThunkType = BaseThunkType<ActionType>;
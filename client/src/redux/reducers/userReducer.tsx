import {UserDocument} from '../../../../src/models/Users'
import { AllActions } from '../action'
export type DefaultUserState = {
    user: UserDocument | null,
    err: any,
    isLoggedIn: boolean
}

const defaultState: DefaultUserState = {
    user: null,
    err: '',
    isLoggedIn: false,
}
const userReducer = (state=defaultState, action: any) => {
    switch (action.type) {
        case "USER_SUCCESS":
            return {
                ...state,
                user : action.payload,
                isLoggedIn: true,
            }

        case "ON_ERROR_USER":
            return {
                ...state,
                err: action.payload
            }
    
        default:
            return state
    }
}

export default userReducer
import {UserDocument} from '../../../../src/models/Users'
type DefaultState = {
    user: UserDocument | null,
    err: any,
    isLoggedIn: boolean
}

const defaultState: DefaultState = {
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
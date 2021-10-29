import {UserDocument} from '../../../../src/models/Users'
type DefaultState = {
    user: UserDocument | null,
    err: any
}

const defaultState: DefaultState = {
    user: null,
    err: ''
}
const userReducer = (state=defaultState, action: any) => {
    switch (action.type) {
        case "USER_SUCCESS":
            return {
                ...state,
                user : action.payload,
            }

        case "ON_ERROR":
            return {
                ...state,
                err: action.payload
            }
    
        default:
            return state
    }
}

export default userReducer
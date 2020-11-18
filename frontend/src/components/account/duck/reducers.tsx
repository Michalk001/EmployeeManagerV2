import {AccountActionTypes, AccountState} from './actions'
import {userTypes} from './types'
import {logout} from "./operations";

export const InitAccountState:AccountState = {
    userData: null

}

export const accountReducer = (state:AccountState, action:AccountActionTypes):AccountState => {
    switch (action.type) {
        case userTypes.SET_USER_DATA:
            return {
                ...state, userData: action.payload
            }
        case userTypes.LOGOUT_USER: {
            logout();
            return {
                ...state, userData: null
            }
        }
        default:
            return state
    }
}
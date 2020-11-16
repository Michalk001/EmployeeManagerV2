import {accountReducer} from "../components/account/duck/reducers";

import {AppState} from "./types";
import {AccountActionTypes} from "../components/account/duck/actions";

    export type Actions = AccountActionTypes;

    export function rootReducer(state:AppState,action:Actions):AppState {

    const {accountState } = state
    return {
        accountState: accountReducer(accountState, action)
    }
}
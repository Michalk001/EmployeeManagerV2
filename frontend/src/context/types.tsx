import {AccountState} from "../components/account/duck/actions";

export interface AppState  {
    accountState: AccountState
}

export interface IStateContext {
    state: AppState;
    dispatch: ({type}:{type:any}) => void;

}

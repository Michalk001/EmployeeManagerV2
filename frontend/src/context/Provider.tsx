import React, {createContext, FC, ReactNode, useReducer} from "react";
import {InitAccountState } from "../components/account/duck/reducers";

import {AppState, IStateContext} from "./types";
import {rootReducer} from "./RootReducer";
import { SnackbarProvider } from 'material-ui-snackbar-provider'



export const InitialState: AppState = {
    accountState: InitAccountState

}

export const GlobalContext = createContext({} as IStateContext);

interface props {
    children:ReactNode
}


export const GlobalProvider:FC<props> = ({children}) =>{

    const [state,dispatch] = useReducer(rootReducer,InitialState )

    return(
        <SnackbarProvider SnackbarProps={{ autoHideDuration: 4000 }}>
            <GlobalContext.Provider
                value={{
                    state,
                    dispatch
                }}
            >
                {children}
            </GlobalContext.Provider>
        </SnackbarProvider>
    )
}
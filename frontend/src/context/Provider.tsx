import React, {createContext, FC, ReactNode, useReducer} from "react";
import {InitAccountState } from "../components/account/duck/reducers";

import {AppState, IStateContext} from "./types";
import {rootReducer} from "./RootReducer";

import { I18nextProvider } from 'react-i18next';
import  i18n  from '../localization/i18nInit'

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
        <I18nextProvider i18n={i18n }>
        <GlobalContext.Provider
                value={{
                    state,
                    dispatch
                }}
            >
                {children}
        </GlobalContext.Provider>
        </I18nextProvider>
    )
}
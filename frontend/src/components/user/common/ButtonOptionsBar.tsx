import React, {FC, useContext, useEffect} from "react"
import {Button, typeButtonAction} from "../../button";
import {IButtonBarOptions, ShowType} from "./types";
import {GlobalContext} from "../../../context/Provider";

export const ButtonOptionsBar:FC<{items:IButtonBarOptions[], usernameProfile?:string  }> = ({items,usernameProfile}) => {

    const { state } = useContext(GlobalContext)

    const canShow = (showType:ShowType) =>{
        if(showType === ShowType.ALL)
            return true
        if((showType === ShowType.ADMIN || showType === ShowType.AdminOrUser) && state.accountState.userData?.isAdmin)
            return true
        if((showType === ShowType.USER || showType === ShowType.AdminOrUser) && state.accountState.userData?.username === usernameProfile)
            return true
        return false
    }

    useEffect(() =>{

    },[state.accountState.userData])

    return(
        <div className={"user-profile__row user-profile__row--button"}>
            {items.map(item => canShow(item.show) ?
                <Button
                    key={item.label}
                    label={item.label}
                    typeAction={typeButtonAction.button}
                    typeButton={item.type}
                    onClick={item.onClick}
                /> : ''
            )}
        </div>
    )
}


import React, {FC, useContext} from "react";
import {Redirect, Route } from "react-router-dom";
import styles from "./style.module.scss"
import {Sidebar} from "../sidebar/Sidebar";
import {GlobalContext} from "../../context/Provider";

interface IRouteComponent {
    Component: FC,
    path:string,
    rest?:any
}


export const UserRoute:FC<IRouteComponent> = ({ path, Component, ...rest }) => {
    const {state} = useContext(GlobalContext)
    return (<Route path={path} {...rest} render={(props: any) => (
        <>
            {state.accountState.userData &&  <Sidebar/>}
            <main className={`${styles[`user`]}`}>
                <div className={`${styles[`user--container`]}`}>
                    <Component {...props}  />
                </div>
            </main>
        </>
    )}
    />)
}

export const  RequireLogin:FC<IRouteComponent>  = (props) => {
    const { state } = useContext(GlobalContext)

    return (<>
        {( state.accountState.userData ) ?<>
                <UserRoute {...props} />
            </>
             :
            <Route render={() => (<Redirect to='/login' />)} />}
    </>)
}
import React, {FC} from "react";
import { Route } from "react-router-dom";
import "./TemplateView.scss"
import {Header} from "../header/Header";
import {Sidebar} from "../sidebar/Sidebar";

interface IRouteComponent {
    Component: FC,
    path:string,
    rest?:any
}


export const UserRoute:FC<IRouteComponent> = ({ path, Component, ...rest }) => (

    <Route path={path} {...rest} render={(props:any) => (
        <>
        <Sidebar />
        <main className="user">

            <div className="user--container">
                <Component {...props}  />
            </div>
        </main>
</>
    )}
    />
)

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';


import { AppRoute } from './AppRoute.enum';
import {UserRoute} from "../components/templateView/UserTemplate";
import {Login} from "../components/account/Login";
import {CreateProject, ListProject} from "../components/admin/project";
import {Create as CreateUser} from "../components/admin/user/Create"

export const AppRoutes = () => {
    return (
        <Switch>
            <UserRoute Component={Login} path={AppRoute.login} />

            <UserRoute Component={CreateProject} path={AppRoute.adminProjectNew}  />
            <UserRoute Component={ListProject} path={AppRoute.adminProjectList}  />
            <UserRoute Component={CreateUser} path={AppRoute.adminUserNew}  />
            <UserRoute Component={()=>{return <div>Hello World</div>}} path={AppRoute.homePage}  />
        </Switch>
    );
};
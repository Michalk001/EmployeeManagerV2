
import React from 'react';
import { Switch } from 'react-router-dom';


import { AppRoute } from './AppRoute.enum';
import {UserRoute} from "../components/templateView/UserTemplate";
import {Login} from "../components/account/Login";
import {CreateProject, ListProject} from "../components/admin/project";
import {CreateUser,ListUser} from "../components/admin/user"
import {UserEditor, UserProfile} from "../components/user/employee";
import {ProjectProfile} from "../components/user/project";

export const AppRoutes = () => {
    return (
        <Switch>
            <UserRoute Component={Login} path={AppRoute.login} />
            <UserRoute Component={CreateProject} path={AppRoute.adminProjectNew}  />
            <UserRoute Component={ListProject} path={AppRoute.adminProjectList}  />
            <UserRoute Component={CreateUser} path={AppRoute.adminUserNew}  />
            <UserRoute Component={ListUser} path={AppRoute.adminUserList}  />
            <UserRoute Component={ProjectProfile} path={AppRoute.projectProfileID} />
            <UserRoute Component={UserEditor} path={AppRoute.userEditorID}  />
            <UserRoute Component={UserEditor} path={AppRoute.userEditor}  />
            <UserRoute Component={UserProfile} path={AppRoute.userProfileID} />
            <UserRoute Component={UserProfile} path={AppRoute.homePage}  />





        </Switch>
    );
};

import React from 'react';
import { Switch } from 'react-router-dom';


import { AppRoute } from './AppRoute.enum';
import {RequireLogin, UserRoute} from "../components/templateView/UserTemplate";
import {Login} from "../components/account/Login";
import {CreateProject, ListProject} from "../components/admin/project";
import {CreateUser,ListUser} from "../components/admin/user"
import {UserEditor, UserProfile} from "../components/user/employee";
import {ProjectProfile} from "../components/user/project";

export const AppRoutes = () => {
    return (
        <Switch>
            <UserRoute Component={Login} path={AppRoute.login} />
            <RequireLogin Component={CreateProject} path={AppRoute.adminProjectNew}  />
            <RequireLogin Component={ListProject} path={AppRoute.adminProjectList}  />
            <RequireLogin Component={CreateUser} path={AppRoute.adminUserNew}  />
            <RequireLogin Component={ListUser} path={AppRoute.adminUserList}  />
            <RequireLogin Component={ProjectProfile} path={AppRoute.projectProfileID} />
            <RequireLogin Component={UserEditor} path={AppRoute.userEditorID}  />
            <RequireLogin Component={UserEditor} path={AppRoute.userEditor}  />
            <RequireLogin Component={UserProfile} path={AppRoute.userProfileID} />
            <RequireLogin Component={UserProfile} path={AppRoute.homePage}  />





        </Switch>
    );
};
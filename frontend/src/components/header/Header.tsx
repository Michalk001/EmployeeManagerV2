import React, {useContext, useEffect} from "react";
import styles from "./style.module.scss"
import { logoutUser, setUserData} from "../account/duck/actions";
import { Link } from "react-router-dom";

import {decodeUserToken, loadTokenFromCookies} from "../account/duck/operations";
import {GlobalContext} from "../../context/Provider"
import {AppRoute} from "../../routing/AppRoute.enum";

export const Header = () =>{

    const { state, dispatch } = useContext(GlobalContext)

    const logout = () =>{
        dispatch(logoutUser())
    }

    return <header className={`${styles[`header`]}`}>
        <div className={`${styles[`header--container`]}`}>
            <div className={`${styles[`header__ico--home`]}`}>
                <Link to={AppRoute.homePage} className={`${styles[`header__menu-list--link`]}`}>
                    <i className="fas fa-home"/>
                </Link>
            </div>

                <ul  className={`${styles[`header__menu-list`]}`}>
                    {state.accountState.userData && <>
                        <li  className={`${styles[`header__menu-list--element`]}`}>{`${state.accountState.userData.firstName} ${state.accountState.userData.lastName}`}</li>
                        <li  className={`${styles[`header__menu-list--element`]}`} onClick={logout} >Log out</li>
                    </>}
                    {!state.accountState.userData && <>
                        <li  className={`${styles[`header__menu-list--element`]}`}><Link to={AppRoute.login} className={`${styles[`header__menu-list--link`]}`}>Log in</Link></li>
                    </>}
                </ul>

        </div>
    </header>
}
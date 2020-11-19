import React, {useContext, useEffect} from "react";
import "./style.scss"
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

    useEffect(()=>{
        const token = loadTokenFromCookies();
        if(token){
            dispatch(setUserData(decodeUserToken(token)))
        }

    },[])

    return <header className={`header`}>
        <div className={`header--container`}>
            <div className={`header__ico--home`}>
                <Link to={AppRoute.homePage} className={`header__menu-list--link`}>
                    <i className="fas fa-home"/>
                </Link>
            </div>

                <ul  className={`header__menu-list`}>
                    {state.accountState.userData && <>
                        <li  className={`header__menu-list--element`}>{`${state.accountState.userData.firstName} ${state.accountState.userData.lastName}`}</li>
                        <li  className={`header__menu-list--element`} onClick={logout} >Log out</li>
                    </>}
                    {!state.accountState.userData && <>
                        <li  className={`header__menu-list--element`}><Link to={AppRoute.login} className={`header__menu-list--link`}>Log in</Link></li>
                    </>}
                </ul>

        </div>
    </header>
}
import React, {FC, useContext, useEffect, useState} from "react";
import Cookies from 'js-cookie';
import styles from "./style.module.scss"
import { Link } from "react-router-dom";
import {AppRoute} from "../../routing/AppRoute.enum";
import {GlobalContext} from "../../context/Provider";

const ListLinkItem :FC<{text:string, path:string}>= ({text, path}) =>{
    return (
        <li className={`${styles[`sidebar__menu--item`]}`}>
            <Link to={path}
                  className={`${styles[`sidebar__menu--text`]} ${styles[`sidebar__menu--link`]}`}
            >
                {text}
            </Link>
        </li>
    )
}

const ListTitleItem:FC<{text:string}> = ({text}) =>{
    return(
        <li className={`${styles[`sidebar__menu--item`]}`}>
            <div className={`${styles[`sidebar__menu--text`]} ${styles[`sidebar__menu--title`]} `}>{text}</div>
        </li>
    )
}

export const Sidebar = () =>{

    const [hiddenMenu, setHiddenMenu] = useState(true);
    const { state } = useContext(GlobalContext)

    const changeMenuVisible = () => {
        Cookies.set('hiddenMenu', String(!hiddenMenu), {expires: 365})
        setHiddenMenu(prevState => !prevState)
    }

    useEffect(() => {
        if (Cookies.get('hiddenMenu') === "true"){
            setHiddenMenu(true)
        } else
            setHiddenMenu(false)

    }, [])

    return (
         <div className={`${styles[`sidebar--wrap`]}`}>
            <div className={`${styles[`sidebar__mask`]} ${hiddenMenu ? ` ${styles[`sidebar__mask--close`]}` : ``}`}/>
            <div className={`${styles[`sidebar__arrows`]} ${hiddenMenu ? `${styles[`sidebar__arrows--close-fix`]}` : ``}`}>
                <i className={`fas fa-arrow-circle-left ${styles[`sidebar__arrows--style`]} 
                ${hiddenMenu ? `${styles[`sidebar__arrows--close`]}` : `${styles[`sidebar__arrows--open`]}`}`}
                   onClick={() => {
                       changeMenuVisible()
                   }}/>
            </div>
            <div className={`${styles[`sidebar`]} ${hiddenMenu ? ` ${styles[`sidebar--close`]}` : ` ${styles[`sidebar--open`]}`} `}>
                <ul className={`${styles[`sidebar__menu`]} `}>
                    <ListTitleItem text={`User Panel`} />
                    <ListLinkItem path={AppRoute.homePage} text={"Home"} />
                    <ListLinkItem path={AppRoute.userProfile} text={"Profile"} />
                </ul>
                {state.accountState.userData?.isAdmin &&
                    <ul className={`${styles[`sidebar__menu`]} `}>
                        <ListTitleItem text={`Admin Panel`} />
                        <ListLinkItem path={AppRoute.adminProjectNew} text={"New Project"} />
                        <ListLinkItem path={AppRoute.adminProjectList} text={"list Project"} />
                        <ListLinkItem path={AppRoute.adminUserNew} text={"New User"} />
                        <ListLinkItem path={AppRoute.adminUserList} text={"List User"} />
                    </ul>
                }
            </div>
        </div>
    )
}
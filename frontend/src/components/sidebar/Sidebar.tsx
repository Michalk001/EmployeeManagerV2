import React, {FC, useEffect, useState} from "react";
import Cookies from 'js-cookie';
import "./style.scss"
import { Link } from "react-router-dom";
import {AppRoute} from "../../routing/AppRoute.enum";

const ListLinkItem :FC<{text:string, path:string}>= ({text, path}) =>{
    return (
        <li className={`sidebar__menu--item`}>
            <Link to={path}
                  className={`sidebar__menu--text sidebar__menu--link`}
            >
                {text}
            </Link>
        </li>
    )
}

const ListTitleItem:FC<{text:string}> = ({text}) =>{
    return(
        <li className={`sidebar__menu--item`}>
            <div className={`sidebar__menu--text sidebar__menu--title `}>{text}</div>
        </li>
    )
}

export const Sidebar = () =>{

    const [hiddenMenu, setHiddenMenu] = useState(true);

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
         <div className={`sidebar--wrap`}>
            <div className={`sidebar__mask ${hiddenMenu ? ` sidebar__mask--close` : ``}`}/>
            <div className={`sidebar__arrows ${hiddenMenu ? `sidebar__arrows--close-fix` : ``}`}>
                <i className={`fas fa-arrow-circle-left sidebar__arrows--style sidebar__arrows--${hiddenMenu ? `close` : `open`}`}
                   onClick={() => {
                       changeMenuVisible()
                   }}/>
            </div>
            <div className={`sidebar sidebar--${hiddenMenu ? `close` : `open`} `}>
                <ul className={`sidebar__menu `}>
                    <ListTitleItem text={`Panel Użytkownika`} />
                    <ListLinkItem path={AppRoute.homePage} text={"Home"} />
                    <ListLinkItem path={AppRoute.adminProjectNew} text={"New Project"} />
                    <ListLinkItem path={AppRoute.adminUserNew} text={"New User"} />
                </ul>

                <ul className={`sidebar__menu `}>
                    <ListTitleItem text={`Panel Admina`} />
                    <ListLinkItem path={AppRoute.homePage} text={"Home"} />
                    <ListLinkItem path={AppRoute.adminProjectNew} text={"New Project"} />
                    <ListLinkItem path={AppRoute.adminProjectList} text={"list Project"} />
                    <ListLinkItem path={AppRoute.adminUserNew} text={"New User"} />
                    <ListLinkItem path={AppRoute.adminUserList} text={"list User"} />
                </ul>
            </div>
        </div>
    )
}
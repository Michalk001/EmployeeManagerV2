import React, {FC, useContext, useEffect, useState} from "react";
import Cookies from 'js-cookie';
import styles from "./style.module.scss"
import { Link } from "react-router-dom";
import {AppRoute} from "../../routing/AppRoute.enum";
import {GlobalContext} from "../../context/Provider";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation('common');
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
         <div >
            <div className={`${styles[`sidebar__mask`]} ${hiddenMenu ? ` ${styles[`sidebar__mask--close`]}` : ``}`}/>
            <div className={`${styles[`sidebar__arrows`]} ${hiddenMenu ? `${styles[`sidebar__arrows--close-fix`]}` : ``}`}>
                <i className={`fas fa-arrow-circle-left ${styles[`sidebar__arrows--style`]} 
                ${hiddenMenu ? `${styles[`sidebar__arrows--close`]}` : `${styles[`sidebar__arrows--open`]}`}`}
                   onClick={() => {
                       changeMenuVisible()
                   }}/>
            </div>
            <div className={`${styles[`sidebar`]} ${hiddenMenu ? ` ${styles[`sidebar--close`]}` :"" } `}>
                <ul className={`${styles[`sidebar__menu`]} `}>
                    <ListTitleItem text={t('sidebar.userPanel')} />
                    <ListLinkItem path={AppRoute.homePage} text={t('sidebar.home')} />
                    <ListLinkItem path={AppRoute.userProfile} text={t('sidebar.profile')} />
                    <ListLinkItem path={AppRoute.userProjectList} text={t('sidebar.projectList')} />
                </ul>
                {state.accountState.userData?.isAdmin &&
                    <ul className={`${styles[`sidebar__menu`]} `}>
                        <ListTitleItem text={t('sidebar.adminPanel')} />
                        <ListLinkItem path={AppRoute.adminProjectNew} text={t('sidebar.newProject')} />
                        <ListLinkItem path={AppRoute.adminProjectList} text={t('sidebar.projectList')}/>
                        <ListLinkItem path={AppRoute.adminUserNew} text={t('sidebar.newUser')} />
                        <ListLinkItem path={AppRoute.adminUserList} text={t('sidebar.userList')} />
                    </ul>
                }
            </div>
        </div>
    )
}
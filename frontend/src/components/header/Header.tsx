import React, {useContext, useEffect, useState} from "react";
import styles from "./style.module.scss"
import { logoutUser} from "../account/duck/actions";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import {GlobalContext} from "../../context/Provider"
import {AppRoute} from "../../routing/AppRoute.enum";
import {useTranslation} from "react-i18next";

export const Header = () =>{

    const {t,i18n } = useTranslation('common');

    const { state, dispatch } = useContext(GlobalContext)
    const [lang, setLang] = useState("")

    const selectLang = (lang:string) => {
        i18n.changeLanguage(lang);
        Cookies.set('lang', lang, {expires: 365});
        setLang(lang)
    }
    const logout = () =>{
        dispatch(logoutUser())
    }

    useEffect(()=>{
        const lang = Cookies.get('lang')
        if (lang) {
            setLang(lang)
            selectLang(lang)
        }
        else {
            setLang("en")
            Cookies.set('lang', "en", {expires: 365})
        }
    },[])

    return <header className={styles.header}>
        <div className={styles.container}>
            <div className={styles.home}>
                <Link to={AppRoute.homePage} className={styles.link}>
                    <i className={`fas fa-home ${styles.home}`} />
                </Link>
            </div>

                <ul  className={styles.list}>
                    { lang === "pl" && <li  className={styles.flagPL} onClick={() => {selectLang("en")}} /> }
                    { lang === "en" && <li  className={styles.flagEN} onClick={() => {selectLang("pl")}} />}
                    {state.accountState.userData && <>
                        <li  className={styles.item}>{`${state.accountState.userData.firstName} ${state.accountState.userData.lastName}`}</li>
                        <li  className={styles.item} onClick={logout} >{t('common.logOut')}</li>
                    </>}
                    {!state.accountState.userData && <>
                        <li  className={styles.item}><Link to={AppRoute.login} className={styles.link}>{t('common.logIn')}</Link></li>
                    </>}
                </ul>

        </div>
    </header>
}
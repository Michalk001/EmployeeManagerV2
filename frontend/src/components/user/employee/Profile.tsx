import React, {useContext, useEffect, useState} from "react"
import { useParams } from "react-router";
import {BoxWide} from "../../box/Wide";
import styles from "./style.module.scss"
import { IUserProfile} from "./duck/types";
import {GlobalContext} from "../../../context/Provider";
import {AppRoute} from "../../../routing/AppRoute.enum";
import {getProjectOfItemList, getUser} from "./duck/operations";
import {ListItemRow, ShowType} from "../common";
import {ButtonOptionsBar} from "../common/ButtonOptionsBar/ButtonOptionsBar";
import {IButtonBarOptions} from "../common/types";
import {typeButton} from "../../button";
import { useHistory } from "react-router-dom";

export const Profile = () =>{

    let isMounted = React.useRef(false);
    const history = useHistory();
    const { state } = useContext(GlobalContext)
    const [user,setUser] = useState<IUserProfile|null>(null)
    const {id} = useParams<{id:string}>()
    const getDataUser = async () =>{
        if(state.accountState.userData && !user) {
            const data = await getUser(id ? id : state.accountState.userData.username);
            setUser(data)
        }
    }

    const getButtonsBar = () =>{
        const items:IButtonBarOptions[] = [];
        items.push({
            type : typeButton.normal,
            show : ShowType.AdminOrUser,
            label: "Edytuj",
            onClick: () => {
                const path = `${AppRoute.userEditor}/${user?.username}`
                history.push(path);
            },
        })
        return items
    }

    useEffect(()=>{
        isMounted.current = true
        if(isMounted.current) {
            getDataUser();
        }
        return () =>{isMounted.current = false}
    },[])


    return(
        <BoxWide>
            {user && <>
                <ButtonOptionsBar
                    items={getButtonsBar()}
                    usernameProfile={user.username}
                />
                <div className={`${styles[`user-profile__text`]}  ${styles[`user-profile__text--bold`]} ${styles[`user-profile__text--section`]}`}>{`${user.firstName} ${user.lastName}`}</div>
                <div className={`${styles[`user-profile__row`]} `}>
                    <div className={`${styles[`user-profile__item`]}`}>
                        <span className={`${styles[`user-profile__text`]} ${styles[`user-profile__text--bold`]}`}>Email: </span>
                        <a href={`mailto:${`adam@małysz.pl`}`} className={`${styles[`user-profile__item--value`]} ${styles[`user-profile__text`]}`}>{user.email}</a>
                    </div>
                    <div className={`${styles[`user-profile__item`]}`}>
                        <span className={`${styles[`user-profile__text`]} ${styles[`user-profile__text--bold`]}`}>Telefon: </span>
                        {user.phoneNumber &&<a href={`tel:${`653763212`}`} className={`${styles[`user-profile__item--value`]} ${styles[`user-profile__text`]}`}>{user.phoneNumber}</a>}
                        {!user.phoneNumber &&<span className={`${styles[`user-profile__item--value`]} ${styles[`user-profile__text`]}`}>Brak</span>}
                    </div>

                </div>
                <ListItemRow
                    label={`Aktywne Projekty`}
                    items={getProjectOfItemList(user.projects.filter(project => project.isActive))}
                />
                <ListItemRow
                    label={`Nieaktywne Projekty`}
                    items={getProjectOfItemList(user.projects.filter(project => !project.isActive))}
                />

            </>}
        </BoxWide>
    )
}
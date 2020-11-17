import React, {useContext, useEffect, useState} from "react"
import { useParams } from "react-router";
import {BoxWide} from "../../../utiles/box/Wide";
import "./style.scss"
import { IUserProfile} from "../../admin/user/duck/types";
import {FetchGet} from "../../../utiles/Fetch";
import config from "../../../utiles/config.json"
import {ProfileRedirect} from "../../common";
import {GlobalContext} from "../../../context/Provider";

export const Profile = () =>{

    const {id} = useParams<{id:string}>()
    const { state } = useContext(GlobalContext)
    const [user,setUser] = useState<IUserProfile|null>(null)

    const getUser = async () =>{
        const res = await FetchGet(`${config.API_URL}/user/${id}`);
        const userTmp:IUserProfile = await res.json();
        setUser(userTmp)
    }

    useEffect(()=>{
        getUser();
    })

    return(
        <BoxWide>
            {user && <>
                <div className={`user-profile__text user-profile__text--bold user-profile__text--section`}>{`${user.firstName} ${user.lastName}`}</div>
                <div className={`user-profile__row`}>
                    <div className={`user-profile__item`}>
                        <span className={`user-profile__text user-profile__text--bold`}>Email: </span>
                        <a href={`mailto:${`adam@małysz.pl`}`} className={`user-profile__item--value user-profile__text`}>{user.email}</a>
                    </div>
                    <div className={`user-profile__item`}>
                        <span className={`user-profile__text user-profile__text--bold `}>Telefon: </span>
                        <a href={`tel:${`653763212`}`} className={`user-profile__item--value user-profile__text`}>653763212</a>
                    </div>

                </div>

                <div className={`user-profile__item user-profile__item--title-list user-profile__text`}>
                    Aktywne Projekty:
                    {user.projects.filter(project => !project.isRemove).length === 0 &&
                        <span className={` user-profile__text`}> Brak </span>
                    }
                </div>
                <div className={`user-profile__row user-profile__row--project-list`}>
                    {user.projects.filter(project => !project.isRemove).map(project =>(
                        <ProfileRedirect
                            key={project.id}
                            path={`/${project.id}`}
                            value={project.name}
                            isAdmin={state.accountState.userData ? state.accountState.userData.isAdmin : false }
                        />
                        ))}

                </div>
                <div className={`user-profile__item user-profile__item--title-list user-profile__text`}>
                    Nieaktywne Projekty:
                    {user.projects.filter(project => project.isRemove).length === 0 &&
                    <span className={` user-profile__text`}> Brak </span>
                    }
                </div>
                <div className={`user-profile__row user-profile__row--project-list`}>
                    {user.projects.filter(project => project.isRemove).map(project =>(
                        <ProfileRedirect
                            key={project.id}
                            path={`/${project.id}`}
                            value={project.name}
                            isAdmin={state.accountState.userData ? state.accountState.userData.isAdmin : false }
                        />
                    ))}

                </div>


            </>}
        </BoxWide>
    )
}
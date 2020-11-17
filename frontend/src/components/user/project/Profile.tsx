import React, {useEffect, useState} from "react"
import {IProjectProfile} from "./types";
import {FetchGet} from "../../../utiles/Fetch";
import config from "../../../utiles/config.json";
import {useParams} from "react-router";
import {BoxWide} from "../../../utiles/box/Wide";

import "./style.scss"
import {ProfileRedirect} from "../../common";
import {AppRoute} from "../../../routing/AppRoute.enum";

export const Profile = () =>{
    let isMounted = React.useRef(false);
    const {id} = useParams<{id:string}>()
    const [project, setProject] = useState<IProjectProfile|null>(null)

    const getProject = async () =>{
        const res = await FetchGet(`${config.API_URL}/project/${id}`);
        const projectTmp:IProjectProfile = await res.json();
        setProject(projectTmp)
    }

    useEffect(() =>{
        isMounted.current = true
        if(isMounted.current) {
            getProject();
        }
        return () =>{isMounted.current = false}
    },[])

    return(
        <BoxWide>
            {project && <>
                <div className={`project-profile__row`}>
                    <div className={`project-profile__text project-profile__text--bold project-profile__text--section`}>{project.name}</div>
                </div>
                <div className={`project-profile__item project-profile__item--title-list project-profile__text`}>
                    Opis:
                </div>
                <div className={`project-profile__item project-profile__item--description`}>
                    {project.description}
                </div>

                <div className={`user-profile__item user-profile__item--title-list user-profile__text`}>
                    Aktywni Pracownicy:
                    {project.users.filter(user => !user.isRemove).length === 0 &&
                    <span className={` user-profile__text`}> Brak </span>
                    }
                </div>
                <div className={`user-profile__row user-profile__row--project-list`}>
                    {project.users.filter(user => !user.isRemove).map(user =>(
                        <ProfileRedirect
                            key={user.username}
                            path={`${AppRoute.userProfile}/${user.username}`}
                            value={project.name}
                            isAdmin={false }
                        />
                    ))}

                </div>

                <div className={`user-profile__item user-profile__item--title-list user-profile__text`}>
                    Nieaktywne Pracownicy:
                    {project.users.filter(user => user.isRemove).length === 0 &&
                    <span className={` user-profile__text`}> Brak </span>
                    }
                </div>
                <div className={`user-profile__row user-profile__row--project-list`}>
                    {project.users.filter(user => user.isRemove).map(user =>(
                        <ProfileRedirect
                            key={user.username}
                            path={`${AppRoute.userProfile}/${user.username}`}
                            value={project.name}
                            isAdmin={false }
                        />
                    ))}

                </div>

            </>}
        </BoxWide>
    )

}
import React, {useEffect, useState} from "react"
import {IProjectProfile} from "./duck/types";
import {FetchGet} from "../../../utiles/Fetch";
import config from "../../../utiles/config.json";
import {useParams} from "react-router";
import {BoxWide} from "../../../utiles/box/Wide";

import "./style.scss"
import {ListItemRow} from "../common";
import {getUserOfItemList} from "./duck/operations";

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
        console.log(1111)
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
                <div className={`project-profile__item project-profile__item--top-line project-profile__item--title-list project-profile__text`}>
                    Opis:
                </div>
                <div className={`project-profile__item project-profile__item--description`}>
                    {project.description}
                </div>
                <ListItemRow
                    items={getUserOfItemList(project.users.filter(user => !user.isRemove))}
                    label={`Aktywni Pracownicy`}
                />
                <ListItemRow
                    items={getUserOfItemList(project.users.filter(user => user.isRemove))}
                    label={`Nieaktywni Pracownicy`}
                />
            </>}
        </BoxWide>
    )

}
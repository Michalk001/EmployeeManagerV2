import React, {useCallback, useEffect, useState} from "react"
import {IProjectProfile} from "./duck/types";
import {FetchGet} from "../../../utiles/Fetch";
import config from "../../../utiles/config.json";
import {useParams} from "react-router";
import {BoxWide} from "../../box/Wide";

import styles from "./style.module.scss"
import {ButtonOptionsBar, ListItemRow, ShowType} from "../common";
import {getUserOfItemList} from "./duck/operations";
import { typeButton} from "../../button";
import {IButtonBarOptions} from "../common/types";
import {AppRoute} from "../../../routing/AppRoute.enum";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const Profile = () =>{
    const {t} = useTranslation('common');
    const isMounted = React.useRef(false);
    const {id} = useParams<{id:string}>()
    const [project, setProject] = useState<IProjectProfile|null>(null)
    const history = useHistory();

    const getProject = useCallback( async () =>{
        const res = await FetchGet(`${config.API_URL}/project/${id}`);
        const projectTmp:IProjectProfile = await res.json();

        setProject(projectTmp)
    },[id])

    const getButtonsBar = () =>{
        const items:IButtonBarOptions[] = [];
        items.push({
            type : typeButton.normal,
            show : ShowType.ADMIN,
            label: t('button.edit'),
            onClick: () => {
                const path = `${AppRoute.projectEditor}/${id}`
                history.push(path);
            },
        })
        return items
    }


    useEffect(() =>{
        isMounted.current = true
        if(isMounted.current) {
            getProject();
        }
        return () =>{isMounted.current = false}
    },[getProject])

    return(
        <BoxWide>
            {project && <>
                <div className={`${styles[`project-profile__row`]} ${styles[`project-profile__row--with-button`]}`}>
                    <div className={`${styles[`project-profile__text`]} ${styles[`project-profile__text--bold`]} ${styles[`project-profile__text--section`]}`}>
                        {project.name}
                    </div>
                    <ButtonOptionsBar
                        items={getButtonsBar()}
                    />
                </div>
                <div className={`${styles[`project-profile__item`]} ${styles[`project-profile__item--top-line`]} ${styles[`project-profile__item--title-list`]} ${styles[`project-profile__text`]}`}>
                    {t('project.description')}:
                </div>
                <div className={`${styles[`project-profile__item`]} ${styles[`project-profile__item--description`]}`}>
                    {project.description}
                </div>
                <ListItemRow
                    items={getUserOfItemList(project.users.filter(user => user.isActive))}
                    label={t('project.activeEmployee')}
                />
                <ListItemRow
                    items={getUserOfItemList(project.users.filter(user => !user.isActive))}
                    label={t('project.inactiveEmployee')}
                />
            </>}
        </BoxWide>
    )

}
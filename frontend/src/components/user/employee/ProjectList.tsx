import React, {useCallback, useContext, useEffect, useState} from "react";
import {BoxWide} from "../../box/Wide";
import {IUserProfile, IUserProfileProject} from "./duck/types";
import {FetchGet} from "../../../utiles/Fetch";
import config from "../../../utiles/config.json"

import {
    ListCellSmall,
    ListCellWide,
    ListTitleRow,
    ListBox,
    ListFilter, ListMessage
} from "../../list";

import {AppRoute} from "../../../routing/AppRoute.enum";
import {LinkRow} from "../../list/Row";
import {useTranslation} from "react-i18next";
import {GlobalContext} from "../../../context/Provider";
import {getStatus} from "../../admin/common/getStatus";

export const ProjectList = () =>{

    const {t} = useTranslation('common');
    const isMounted = React.useRef(false);
    const { state } = useContext(GlobalContext)
    const [projectList, setProjectList] = useState<IUserProfileProject[]>([]);
    const [projectsFiltered, setProjectsFiltered] = useState<IUserProfileProject[]>([])

    const getProjectList = useCallback( async () =>{

        const res = await FetchGet(`${config.API_URL}/user/${state.accountState.userData?.username}`);

        const data:IUserProfile = await res.json();
        console.log(data)
        setProjectList(data.projects);
        setProjectsFiltered(data.projects)
    },[state.accountState.userData?.username])

    const updateFilteredValue = (object:IUserProfileProject[]) =>{
        setProjectsFiltered(object)
    }


    useEffect(() =>{
        isMounted.current = true
        if(isMounted.current) {
            getProjectList();
        }
        return () =>{isMounted.current = false}
    },[getProjectList])
    return(
        <BoxWide>

            <ListFilter originValue={projectList} setFilterValue={updateFilteredValue}/>
            <ListBox>
                <ListTitleRow>
                    <ListCellWide value={t('project.name').toString()}/>
                    <ListCellSmall value={t('common.status').toString()} />
                </ListTitleRow>
                <ListBox>
                    {projectsFiltered.map(project =>(
                        <LinkRow path={`${AppRoute.projectProfile}/${project.id}`}  key={project.id}>
                            <ListCellWide value={project.name}/>
                            <ListCellSmall  value={t(`common.${getStatus(project.isActive)}`).toString()} />
                        </LinkRow>
                    ))}
                    {projectsFiltered.length === 0 &&
                    <ListMessage value={t('project.notFoundProjects')} />
                    }
                </ListBox>

            </ListBox>


        </BoxWide>
    )
}
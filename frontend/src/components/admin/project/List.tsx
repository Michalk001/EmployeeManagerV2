import React, {useEffect, useState} from "react";
import {BoxWide} from "../../box/Wide";
import {IProjectList} from "./duck/types";
import {FetchGet} from "../../../utiles/Fetch";
import config from "../../../utiles/config.json"

import {
    ListCellNormal,
    ListCellSmall,
    ListCellWide,
    ListTitleRow,
    ListBox,
    ListFilter, ListMessage
} from "../../list";

import {AppRoute} from "../../../routing/AppRoute.enum";
import {LinkRow} from "../../list/Row";
import {getStatus} from "../common/getStatus";
import {useTranslation} from "react-i18next";

export const List = () =>{

    const {t} = useTranslation('common');
    const isMounted = React.useRef(false);
    const [projects, setProjects] = useState<IProjectList[]>([])
    const [projectsFiltered, setProjectsFiltered] = useState<IProjectList[]>([])

    const getProjectList = async () =>{
        const res = await FetchGet(`${config.API_URL}/project`);
        const projectList:IProjectList[] = await res.json()
        setProjects(projectList);
        setProjectsFiltered(projectList);
    }

    const updateFilteredValue = (object:IProjectList[]) =>{
        setProjectsFiltered(object)
    }


    useEffect(() =>{
        isMounted.current = true
        if(isMounted.current) {
            getProjectList();
        }
        return () =>{isMounted.current = false}
    },[])
    return(
        <BoxWide>

            <ListFilter originValue={projects} setFilterValue={updateFilteredValue}/>
            <ListBox>
                <ListTitleRow>
                    <ListCellWide value={t('project.name').toString()}/>
                    <ListCellNormal value={t('project.employees').toString()} />
                    <ListCellSmall value={t('common.status').toString()} />
                </ListTitleRow>
                <ListBox>
                    {projectsFiltered.map(project =>(
                        <LinkRow path={`${AppRoute.projectProfile}/${project.id}`}  key={project.id}>
                             <ListCellWide value={project.name}/>
                             <ListCellNormal value={project.employee} />
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
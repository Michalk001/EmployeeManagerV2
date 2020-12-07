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

export const List = () =>{

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
        getProjectList();
    },[])
    return(
        <BoxWide>

            <ListFilter originValue={projects} setFilterValue={updateFilteredValue}/>
            <ListBox>
                <ListTitleRow>
                    <ListCellWide value={`Name`}/>
                    <ListCellNormal value={`Employees`} />
                    <ListCellSmall value={`Status`} />
                </ListTitleRow>
                <ListBox>
                    {projectsFiltered.map(project =>(
                        <LinkRow path={`${AppRoute.projectProfile}/${project.id}`}  key={project.id}>
                             <ListCellWide value={project.name}/>
                             <ListCellNormal value={project.employee} />
                             <ListCellSmall value={getStatus(project.isActive)} />
                        </LinkRow>
                   ))}
                    {projectsFiltered.length === 0 &&
                    <ListMessage value={`Not Found Projects`} />
                    }
                </ListBox>

            </ListBox>


        </BoxWide>
    )
}
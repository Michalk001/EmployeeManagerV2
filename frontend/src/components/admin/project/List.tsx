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
    const getStatus = (status:string) =>{
        if(status === "active" )
            return "Active"
        if(status === "inactive")
            return "Inactive"
        return "Unknown"
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
                             <ListCellSmall value={getStatus(project.status)} />
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
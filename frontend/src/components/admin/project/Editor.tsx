import React, {ChangeEvent, useEffect, useState} from "react";
import {useParams} from "react-router";
import {IProjectEditor} from "../../user/project/duck/types";
import {FetchGet} from "../../../utiles/Fetch";
import config from "../../../utiles/config.json";
import {BoxWide} from "../../box/Wide";
import {Input, InputTextarea, TypeInput} from "../../InputField";
import styles from "./style.module.scss";
import {ListItemRow} from "../../user/common";
import {getUserOfItemList} from "../../user/project/duck/operations";


export const Editor = () =>{
    const isMounted = React.useRef(false);
    const {id} = useParams<{id:string}>()
    const [project, setProject] = useState<IProjectEditor|null>(null)

    const getProject = async () =>{
        const res = await FetchGet(`${config.API_URL}/project/${id}`);
        const projectTmp:IProjectEditor = await res.json();
        setProject(projectTmp)
    }

    const updateValue = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
        if(project)
            setProject({...project, [e.target.name]: e.target.value})
    }

    useEffect(() =>{
        isMounted.current = true
        if(isMounted.current) {
            getProject();
        }
        return () =>{isMounted.current = false}
    },[])

    if(project)
    return(
        <BoxWide>
            <Input
                value={project.name}
                onChange={updateValue}
                id={`name`}
                name={`name`}
                labelName={"Name"}
                type={TypeInput.text}
                classWrap={`${styles[`project__field`]}`}
              //  showRequired={invalidField.name}
            />
            <InputTextarea
                value={project.description}
                onChange={updateValue}
                name={`description`}
                id={`description`}
                labelName={`Description`}
                classWrap={`${styles[`project__field`]} ${styles[`project__field--description`]}`}

            />
            <ListItemRow
                items={getUserOfItemList(project.users.filter(user => user.isActive))}
                label={`Aktywni Pracownicy`}
            />
            <ListItemRow
                items={getUserOfItemList(project.users.filter(user => !user.isActive))}
                label={`Nieaktywni Pracownicy`}
            />
        </BoxWide>
    )
    else
        return (<></>)
}
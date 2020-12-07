import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import {IProjectEditor, IProjectUserProfile} from "../../user/project/duck/types";
import {Fetch, FetchGet, Method} from "../../../utiles/Fetch";
import config from "../../../utiles/config.json";
import {BoxWide} from "../../box/Wide";
import {Input, InputSelect, InputTextarea, TypeInput} from "../../InputField";
import styles from "./style.module.scss";
import {ButtonOptionsBar, ListItemRow, ShowType} from "../../user/common";
import {IButtonBarOptions} from "../../user/common/types";
import {Button, typeButton, typeButtonAction} from "../../button";
import {ProfileActionList} from "../../list";
import {IProfileAction} from "../common/types";
import {AppRoute} from "../../../routing/AppRoute.enum";
import {IResultProjectUser, IUser} from "./duck/types";
import {optionType} from "../../InputField/InputSelect";
import {ValueType} from "react-select";
import {ISnackbar, Snackbar, TypeAlert} from "../../snackbar";
import {getUserOfItemList} from "../../user/project/duck/operations";
import { useHistory } from "react-router-dom";



export const Editor = () =>{
    const isMounted = React.useRef(false);
    const {id} = useParams<{id:string}>()
    const [project, setProject] = useState<IProjectEditor|null>(null)
    const [selectUser, setSelectUser] = useState<optionType[]>([])
    const [addUser, setAddUser] = useState<optionType|null>(null)
    const history = useHistory();
    const [snackbarValue, setSnackbarValue] = useState<ISnackbar>({
        text:"",
        isOpen:false,
        typeAlert:TypeAlert.error,
        hideDuration:4000,
        onClose:() => setSnackbarValue(prevState =>( {...prevState,isOpen: false}))
    })

    const getProject = useCallback(async () =>{
        const res = await FetchGet(`${config.API_URL}/project/${id}`);
        const projectTmp:IProjectEditor = await res.json();
        setProject(projectTmp)

    }, [id])
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
    },[getProject])


    const getUsersList = useCallback( async() =>{

        if(project) {
            const res = await FetchGet(`${config.API_URL}/user/`);
            const users: IUser[] = await res.json()
            const userSelect = users.filter(({username: id1}) => !project.users.some(({username:id2}) => id1 === id2) )
            console.log(userSelect)
            setSelectUser(userSelect.map((user): optionType => {
                return {
                    value: user.username,
                    label: `${user.firstName} ${user.lastName}`
                }
            }))
        }
    }, [project])

    useEffect(() =>{
        isMounted.current = true
        if(isMounted.current) {
            getUsersList()
        }
        return () =>{isMounted.current = false}
    },[getUsersList])


    const removeEmployee = async (id:string) =>{
        const res = await Fetch(`${config.API_URL}${AppRoute.projectUser}/${id}`,Method.PUT, {
            isActive:false
        })
        if(res.status === 204){
            if(project) {
                const projectUser = project.users.map(user =>{
                    if(user.projectUserID === id )
                        return {...user, isActive : false}
                    return  user
                })
                setProject( {...project, users:projectUser})
            }
        }
    }

    const deleteEmployee = async (id:string) =>{
        const res = await Fetch(`${config.API_URL}${AppRoute.projectUser}/${id}`,Method.DELETE,{})
        if(res.status === 204){
            if(project) {
                const projectUser = project.users.filter(user => user.projectUserID !== id)
                setProject( {...project, users:projectUser})
            }
            setSnackbarValue(prevState =>({
                ...prevState,
                typeAlert:TypeAlert.success,
                isOpen:true,
                text:"Remove Employee"
            }))
        }else{
            setSnackbarValue(prevState =>({
                ...prevState,
                typeAlert:TypeAlert.error,
                isOpen:true,
                text:"Error"
            }))
        }
    }
    const restoreEmployee = async (id:string) =>{
        const res = await Fetch(`${config.API_URL}${AppRoute.projectUser}/${id}`,Method.PUT, {
            isActive:true
        })
        if(res.status === 204){
            if(project) {
                const projectUser = project.users.map(user =>{
                    if(user.projectUserID === id )
                        return {...user, isActive : true}
                    return  user
                })
                setProject( {...project, users:projectUser})
            }
        }
    }

    const getUserProfileList = (projectUsers:IProjectUserProfile[]):IProfileAction[] =>{
        return projectUsers.map(user => (
            {
                value: `${user.firstName} ${user.lastName}`,
                id: user.projectUserID,
                isActive: user.isActive,
                path: `${AppRoute.userProfile}/${user.username}`,
                onClickRestore: restoreEmployee,
                onClickRemove: removeEmployee,
                onClickDelete: deleteEmployee
            }
        ))
    }

    const handleUpdate = async () =>{
        if(project) {
            const res = await Fetch(`${config.API_URL}/project/${id}`, Method.PUT, {
                project: {
                    description: project.description,
                    name: project.name
                }
            })
            if (res.status === 200) {
                setSnackbarValue(prevState => ({
                    ...prevState,
                    typeAlert: TypeAlert.success,
                    isOpen: true,
                    text: "Update"
                }))
            } else {
                setSnackbarValue(prevState => ({
                    ...prevState,
                    typeAlert: TypeAlert.error,
                    isOpen: true,
                    text: "Error"
                }))
            }
        }
    }

    const handleArchive = async () =>{
        if(project) {
            const isActive = !project.isActive
            const res = await Fetch(`${config.API_URL}/project/${id}`, Method.PUT, {project: {isActive}})
            if (res.status === 200) {
                setProject(prevState => (prevState ? {...prevState, isActive: isActive} : prevState))
                if(!isActive)
                setProject(prevState => (prevState ? {...prevState, users: prevState.users
                        .map(user => {return {...user,isActive:false}})}
                        : prevState))
                setSnackbarValue(prevState => ({
                    ...prevState,
                    typeAlert: TypeAlert.success,
                    isOpen: true,
                    text: isActive ? `Restore` : `Archive`
                }))

            }else {
                setSnackbarValue(prevState => ({
                    ...prevState,
                    typeAlert: TypeAlert.error,
                    isOpen: true,
                    text: "Error"
                }))
            }

        }
    }

    const handleDelete = async () =>{
        const res = await Fetch(`${config.API_URL}/project/${id}`,Method.DELETE, {})
        if(res.status === 200){
            history.push("/")
        }
        else{
            setSnackbarValue(prevState => ({
                ...prevState,
                typeAlert: TypeAlert.error,
                isOpen: true,
                text: "Error"
            }))
        }
    }

    const getButtonsBar = () =>{
        const items:IButtonBarOptions[] = [];
        if(!project)
            return items
        if(project.isActive)
            items.push({
                type : typeButton.update,
                show : ShowType.ADMIN,
                label: "Update",
                onClick: handleUpdate
            })
        items.push({
            type : project.isActive ? typeButton.normal : typeButton.update,
            show : ShowType.ADMIN,
            label: project.isActive ? "Archive" : "Restore",
            onClick: handleArchive
        })
        items.push({
            type : typeButton.remove,
            show : ShowType.ADMIN,
            label: "Delete",
            onClick: handleDelete,
        })
        return items
    }

    const handleAddUser = (e:ValueType<optionType>  ) =>{
        const selected = e as optionType
        setAddUser({value:selected.value, label:selected.label})
    }
    const handleSaveUserToProject = async() =>{
        if(!addUser)
            return
        const res = await Fetch(`${config.API_URL}${AppRoute.projectUser}`,Method.POST, {
            userID: addUser.value,
            projectID: id
        })
        const resultProjectUser = await res.json() as IResultProjectUser
        if(res.status === 201){
            setSelectUser(prevState => prevState.filter(user => user.value !== addUser.value))

            if(project)
                setProject({...project,users:[...project.users,{
                        projectUserID:resultProjectUser.id,
                        username:  addUser.value,
                        isActive: resultProjectUser.isActive,
                        id: resultProjectUser.user.username,
                        lastName: resultProjectUser.user.lastName,
                        firstName: resultProjectUser.user.firstName
                }]})

            setAddUser(null)
            setSnackbarValue(prevState =>({
                ...prevState,
                typeAlert:TypeAlert.success,
                isOpen:true,
                text:"Success"
            }))
        }
        else{
            setSnackbarValue(prevState =>({
                ...prevState,
                typeAlert:TypeAlert.error,
                isOpen:true,
                text:"Error"
            }))
        }
    }
    if(project)
    return(
        <BoxWide>
            <ButtonOptionsBar
                items={getButtonsBar()}
            />
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
            <div className={styles['project__row']}>
                <InputSelect
                    options={selectUser}
                    value={addUser}
                    onChange={handleAddUser}
                    id={"addUserToProject"}
                    isMulti={false}
                    classWrap={styles.addSelect}
                />
                <Button label={"Add"} typeAction={typeButtonAction.button} typeButton={typeButton.normal} onClick={handleSaveUserToProject} />
            </div>
            {project.isActive && <>
                <ProfileActionList
                    label={"Active Employee"}
                    items={getUserProfileList(project.users.filter(user => user.isActive))}
                />
                <ProfileActionList
                label={"Inactive Employee"}
                items={getUserProfileList(project.users.filter(user => !user.isActive))}
                />
            </>}
            {!project.isActive && <>
            <ListItemRow
                items={getUserOfItemList(project.users)}
                label={`Nieaktywni Pracownicy`}
            />
            </>}
            <Snackbar
                {...snackbarValue}
            />
        </BoxWide>

    )
    else
        return (<></>)
}
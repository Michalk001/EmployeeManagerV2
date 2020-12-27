import React, {ChangeEvent, useCallback, useContext, useEffect, useState} from "react"
import {IProjectProfile, IProjectUserProfile} from "./duck/types";
import {Fetch, FetchGet, Method} from "../../../utiles/Fetch";
import config from "../../../utiles/config.json";
import {useParams} from "react-router";
import {BoxWide} from "../../box/Wide";

import styles from "./style.module.scss"
import {ButtonOptionsBar, ListItemRow, ShowType} from "../common";
import {getUserOfItemList} from "./duck/operations";
import {Button, typeButton, typeButtonAction} from "../../button";
import {IButtonBarOptions} from "../common/types";
import {AppRoute} from "../../../routing/AppRoute.enum";
import {useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Input, TypeInput} from "../../InputField";
import {ISnackbar, Snackbar, TypeAlert} from "../../snackbar";
import {GlobalContext} from "../../../context/Provider";

export const Profile = () =>{
    const {t} = useTranslation('common');
    const isMounted = React.useRef(false);
    const {id} = useParams<{id:string}>()
    const [project, setProject] = useState<IProjectProfile|null>(null)
    const history = useHistory();
    const [currentUserData, setCurrentUserData] = useState<undefined|IProjectUserProfile>(undefined)
    const { state } = useContext(GlobalContext)

    const [newHours,setNewHours] = useState<string>("");

    const getProject = useCallback( async () =>{
        const res = await FetchGet(`${config.API_URL}/project/${id}`);
        const projectTmp:IProjectProfile = await res.json();
        console.log(projectTmp)
        const currentUser = projectTmp.users.find(user => user.username === state.accountState.userData?.username)
        setCurrentUserData(currentUser)
        setProject(projectTmp)

    },[id])

    const updateNewHours = (e:ChangeEvent<HTMLInputElement>) =>{
        if(e.target){
            if(parseInt(e.target.value) < 0)
                setNewHours("0");
            else if(e.target.value !== '-')
                setNewHours(e.target.value);
        }
    }
    const [snackbarValue, setSnackbarValue] = useState<ISnackbar>({
        text:"",
        isOpen:false,
        typeAlert:TypeAlert.error,
        hideDuration:4000,
        onClose:() => setSnackbarValue(prevState =>( {...prevState,isOpen: false}))
    })

    const handleNewHours = async (addHours: boolean) =>{
        const res = await Fetch(`${config.API_URL}/projectUser/${currentUserData?.projectUserID}`,Method.PUT, {
            newHours: addHours ? newHours : "-" + newHours
        })
        if(res.status === 204) {
            setSnackbarValue(prevState => ({...prevState,text:t('common.updated'),typeAlert:TypeAlert.success,isOpen:true}))
            if(currentUserData?.hours) {

                let updateHours =  addHours ? currentUserData.hours +  parseInt(newHours) :currentUserData.hours -  parseInt(newHours)
                if(updateHours < 0)
                    updateHours = 0;
                setCurrentUserData({
                    ...currentUserData,
                    hours: updateHours
                })
                setNewHours("")
            }
        }
        else {
            setSnackbarValue(prevState => ({...prevState,text:t('common.error'),typeAlert:TypeAlert.error,isOpen:true}))
        }
    }

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
                <div className={`${styles[`project-profile__item`]} ${styles[`project-profile__item--top-line`]} ${styles[`project-profile__item--title-list`]}
                          ${styles[`project-profile__text`]}`}>
                    {t('project.description')}:
                </div>
                <div className={`${styles[`project-profile__item`]} ${styles[`project-profile__item--description`]}`}>
                    {project.description}
                </div>
                {currentUserData && currentUserData.isActive && project.isActive && <>
                    <div className={`${styles[`project-profile__item`]} ${styles[`project-profile__item--title-list`]}  ${styles[`project-profile__text`]}`}>
                        {t('project.workHours')}: {currentUserData.hours}
                    </div>
                    <div className={`${styles[`project-profile__item`]} ${styles[`project-profile__item--hours`]} `}>
                        <Input
                            value={newHours}
                            onChange={updateNewHours}
                            id={"addHour"}
                            name={"addHour"}
                            type={TypeInput.number}
                            classWrap={`${styles[`project-profile__item--hours-input`]}`}
                        />
                        <Button
                            label={t('project.addWorkHours')}
                            typeAction={typeButtonAction.button}
                            typeButton={typeButton.normal}
                            onClick={(e) => handleNewHours(true)}
                        />
                        <Button
                            label={t('project.removeWorkHours')}
                            typeAction={typeButtonAction.button}
                            typeButton={typeButton.normal}
                            onClick={(e) => handleNewHours(false)}
                        />
                    </div>
                </> }
                <ListItemRow
                    items={getUserOfItemList(project.users.filter(user => user.isActive))}
                    label={t('project.activeEmployee')}
                />
                <ListItemRow
                    items={getUserOfItemList(project.users.filter(user => !user.isActive))}
                    label={t('project.inactiveEmployee')}
                />
            </>}
            <Snackbar
                {...snackbarValue}
            />
        </BoxWide>
    )

}
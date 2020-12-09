import React, {ChangeEvent, useCallback, useContext, useEffect, useState} from "react"
import {useParams} from "react-router";
import {BoxWide} from "../../box/Wide";
import {IUserProfile} from "./duck/types";
import {GlobalContext} from "../../../context/Provider";
import {getProjectOfItemList, getUser} from "./duck/operations";
import {Button, typeButton, typeButtonAction} from "../../button";

import {Input, TypeInput} from "../../InputField";
import {ButtonOptionsBar, ListItemRow, ShowType} from "../common";
import {IButtonBarOptions} from "../common/types";
import {IAlertList, ISnackbarMultiAlert, SnackbarMultiAlert, TypeAlert} from "../../snackbar";


import styles from "./style.module.scss"
import {typeValidUserForm, ValidPassword, ValidPhone, ValidUserForm} from "../../../utiles/valid";
import {AdminSelect} from "../../common";
import {Fetch, Method} from "../../../utiles/Fetch";
import config from "../../../utiles/config.json";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";

const defaultInvalidField = {
    firstName:false,
    lastName:false,
    email:false,
    newPassword:false,
    repeatPassword:false
}



export const Editor = () =>{
    const {t} = useTranslation('common');
    const {id} = useParams<{id:string}>()
    const isMounted = React.useRef(false);
    const [invalidField, setInvalidField] = useState(defaultInvalidField)
    const { state } = useContext(GlobalContext)
    const [user,setUser] = useState<IUserProfile|null>(null)
    const history = useHistory();
    const [changePasswordValue,setChangeNewPasswordValue] = useState({
        oldPassword:"",
        newPassword:"",
        repeatNewPassword:""
    });

    const [alertList,setAlertList] = useState<ISnackbarMultiAlert>({
        hideDuration:1000,
        alertList:[],
        isOpen:false,
        typeAlert:TypeAlert.error,
        onClose: () =>{
            setAlertList(prevState =>( {...prevState,isOpen:false}))
        }
    })



    const getDataUser = useCallback(async () =>{

        if(state.accountState.userData) {
            const data = await getUser(id ? id : state.accountState.userData.username);
            setUser(data )
        }
    },[])

    useEffect(()=>{
        isMounted.current = true
        if(isMounted.current) {
            getDataUser();
        }
        return () =>{isMounted.current = false}
    },[getDataUser])

    const getButtonsBar = () =>{
        const items:IButtonBarOptions[] = [];
        if(!user)
            return items
        items.push({
            type : typeButton.update,
            show : ShowType.AdminOrUser,
            label: t('button.update'),
            onClick: handleUpdateUser,
        })
        items.push({
            type : typeButton.normal,
            show : ShowType.ADMIN,
            label: user.isActive ? t('button.archive') : t('button.restore') ,
            onClick: handleArchive,
        })
        items.push({
            type : typeButton.remove,
            show : ShowType.ADMIN,
            label: t('button.delete'),
            onClick: handleDelete,
        })
        return items
    }

    const updateUserValue = (e:ChangeEvent<HTMLInputElement>) =>{
        if(user)
            setUser(prevState => (prevState ? {...prevState,[e.target.name]:e.target.value} : prevState))
    }


    const handleUpdateUser = async () =>{
        if(!user)
            return
        setInvalidField(defaultInvalidField);
        setAlertList({...alertList, isOpen: false, alertList: []})
        const {isInvalid,alerts} = ValidUserForm(user,typeValidUserForm.EDIT_USER)

        if(isInvalid){
            alerts.push({text:t('common.requiredField')})
            if(alerts.length > 0)
            setAlertList({...alertList, isOpen: true, alertList: alerts})
            return
        }
        try {
            const res = await Fetch(`${config.API_URL}/user/${user.username}`, Method.PUT, {user: user});
            if (res.status === 204) {
                setAlertList(prevState => ({...prevState,
                    typeAlert: TypeAlert.success,
                    isOpen: true,
                    alertList:[{
                        text: t('common.updated')
                       }]
                }));
                return
            }
            if (res.status === 404) {
                setAlertList(prevState => ({...prevState,
                    typeAlert: TypeAlert.warning,
                    isOpen: true,
                    alertList:[{
                        text: t('common.notFound')
                    }]

                }));
                return
            }
        }
        catch (e) {

            setAlertList(prevState => ({...prevState,
                typeAlert: TypeAlert.error,
                isOpen: true,
                alertList:[{
                    text: `${t('common.error')}: ${e.toString()}`
                }]
            }));
            return
        }

        setAlertList(prevState => ({...prevState,
            typeAlert: TypeAlert.error,
            isOpen: true,
            alertList:[{
                text: t('common.unknownError')
            }]

        }));
    }

    const handleChangePassword = async () =>{
        if(!user)
            return
        const validPassword = ValidPassword(changePasswordValue.newPassword,changePasswordValue.repeatNewPassword,user.username)
        if(validPassword ){
            setAlertList(prevState => ({...prevState,
                typeAlert: TypeAlert.warning,
                isOpen: true,
                alertList: validPassword.map(alert => {return {text: alert}})

            }));

            return
        }

        const res = await Fetch(`${config.API_URL}/auth/changePassword/${user.username}`,Method.PUT, {...changePasswordValue})
        if(res.status === 200){
            setAlertList(prevState => ({...prevState,
                typeAlert: TypeAlert.success,
                isOpen: true,
                alertList:[{
                    text: t('user.changedPassword')
                }]

            }));
        }else{
            setAlertList(prevState => ({...prevState,
                typeAlert: TypeAlert.error,
                isOpen: true,
                alertList:[{
                    text: t('common.error')
                }]

            }));
        }
    }

    const updateChangePassword = (e:ChangeEvent<HTMLInputElement>) =>{
        setChangeNewPasswordValue(prevState => ({...prevState,[e.target.name]:e.target.value}))
    }



    const handleArchive = async () =>{
        if(!user)
            return
        const isActive = !(user.isActive)
        const res = await Fetch(`${config.API_URL}/user/${id}`, Method.PUT, {user: {isActive}})
        console.log(res.status)
        if (res.status === 204) {
            setUser(prevState => (prevState ? {...prevState, isActive: isActive} : prevState))
            setAlertList(prevState => ({...prevState,
                typeAlert: TypeAlert.success,
                isOpen: true,
                alertList:[{
                text: isActive ?  t('common.restored')  :  t('common.archived')
            }]}));

        }
        else {

            setAlertList(prevState => ({...prevState,
                typeAlert: TypeAlert.error,
                isOpen: true,
                alertList:[{
                    text: t('common.error')
                }]}));
        }
    }

    const handleDelete = async () => {
        const res = await Fetch(`${config.API_URL}/user/${id}`,Method.DELETE, {})
        if(res.status === 200){
            history.push("/")
        }
        else{
            setAlertList(prevState => ({...prevState,
                typeAlert: TypeAlert.error,
                isOpen: true,
                alertList:[{
                    text: t('common.error')
                }]}));
        }
    }


    if(user)
        return(

        <BoxWide>
            <ButtonOptionsBar
                items={getButtonsBar()}
                usernameProfile={user.username}
            />
            {console.log(user)}
            {user.username !== "" && <>
                <div className={`${styles[`user-profile__row`]}`} >
                    <Input
                        value={user.firstName}
                        onChange={updateUserValue}
                        id={`firstName`}
                        name={`firstName`}
                        type={TypeInput.text}
                        labelName={t('user.firstName')}

                        showRequired={invalidField.firstName}
                    />
                    <Input
                        value={user.lastName}
                        onChange={updateUserValue}
                        id={`lastName`}
                        name={`lastName`}
                        type={TypeInput.text}
                        labelName={t('user.lastName')}
                        showRequired={invalidField.lastName}
                    />
                    <Input
                        value={user.email}
                        onChange={updateUserValue}
                        id={`email`}
                        name={`email`}
                        type={TypeInput.text}
                        labelName={t('user.email')}
                        showRequired={invalidField.email}
                    />


                </div>
                <div className={`${styles[`user-profile__row`]}`}>
                    <Input
                        value={user.phoneNumber ? user.phoneNumber: ""}
                        onChange={(e) => ValidPhone(e.target.value)? updateUserValue(e) : null}
                        id={`phoneNumber`}
                        name={`phoneNumber`}
                        type={TypeInput.text}
                        labelName={t('user.phoneNumber')}
                    />
                    {state.accountState.userData?.isAdmin && <AdminSelect
                        selectType={user.isAdmin}
                        updateAdmin={(isAdmin => {
                            setUser(prevState => prevState ? ({...prevState, isAdmin}) : prevState)
                        })}
                    />}
                </div>
                <div className={`${styles[`user-profile__row`]} ${styles[`user-profile__item--top-line`]}`}>
                    <Input
                        value={changePasswordValue.oldPassword}
                        onChange={updateChangePassword}
                        id={`oldPassword`}
                        name={`oldPassword`}
                        type={TypeInput.password}
                        labelName={t('user.oldPassword')}
                        showRequired={invalidField.newPassword}
                    />
                    <Input
                        value={changePasswordValue.newPassword}
                        onChange={updateChangePassword}
                        id={`newPassword`}
                        name={`newPassword`}
                        type={TypeInput.password}
                        labelName={t('user.newPassword')}
                        showRequired={invalidField.newPassword}
                    />
                    <Input
                        value={changePasswordValue.repeatNewPassword}
                        onChange={updateChangePassword}
                        id={`repeatNewPassword`}
                        name={`repeatNewPassword`}
                        type={TypeInput.password}
                        labelName={t('user.repeatPassword')}
                        showRequired={invalidField.repeatPassword}
                    />
                    <Button
                        label={t('user.changePassword')}
                        typeAction={typeButtonAction.button}
                        typeButton={typeButton.normal}
                        classWrap={`${styles[`user-profile__item`]}`}
                        onClick={handleChangePassword}
                    />
                </div>
            </>}
            <ListItemRow
                label={t('user.activeProjects')}
                items={getProjectOfItemList(user.projects.filter(project => project.isActive))}

            />
            <SnackbarMultiAlert
                {...alertList}
            />
        </BoxWide>
    )
    else
        return (<></>)
}
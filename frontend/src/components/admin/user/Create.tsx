import React, {ChangeEvent, useEffect, useState} from "react";
import styles from './style.module.scss'
import {BoxWide} from "../../box/Wide";
import {Input, TypeInput} from "../../InputField";
import {IUserNew} from "./duck/types";
import {Button, typeButton, typeButtonAction} from "../../button";
import {ISnackbarMultiAlert, Snackbar, SnackbarMultiAlert, TypeAlert, ISnackbar} from "../../snackbar";
import {Fetch, Method} from "../../../utiles/Fetch";
import config from "../../../utiles/config.json"
import {IInvalidUserForm, typeValidUserForm, ValidPhone, ValidUserForm} from "../../../utiles/valid";
import {AdminSelect} from "../../common";
import {useTranslation} from "react-i18next";




const defaultUser:IUserNew ={
    firstName:"",
    lastName:"",
    username:"",
    email:"",
    password:"",
    isAdmin:false,
    phoneNumber:"",
    repeatPassword:""
}
const defaultInvalidField = {
    password:false,
    firstName:false,
    lastName:false,
    email:false,
    username:false,
    phoneNumber: false,
    repeatPassword: false

}


export const Create = () =>{

    const {t} = useTranslation('common');
    const [invalidField, setInvalidField] = useState<IInvalidUserForm>(defaultInvalidField)
    const [user, setUser] = useState(defaultUser);
    const [snackbarValue, setSnackbarValue] = useState<ISnackbar>({
        text:"",
        isOpen:false,
        typeAlert:TypeAlert.info,
        onClose:() => setSnackbarValue(prevState => ({...prevState,isOpen: false})),
        hideDuration:5000
    })
    const [alertList,setAlertList] = useState<ISnackbarMultiAlert>({
        hideDuration:5000,
        alertList:[],
        isOpen:false,
        typeAlert:TypeAlert.error,
        onClose: () =>{ setAlertList(prevState =>( {...prevState,isOpen:false}))}
    })


    const updateUserValue = (e:ChangeEvent<HTMLInputElement>) =>{
        setUser(prevState => ({...prevState,[e.target.name]:e.target.value}))
    }


    const handleSaveUser = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setAlertList({...alertList, isOpen: false, alertList:[]})
        setInvalidField(defaultInvalidField)
        const {isInvalid,alerts,invalidField} = ValidUserForm(user,typeValidUserForm.NEW_USER)
        setInvalidField(invalidField)
        if(alert.length > 0) {
            setAlertList({...alertList, isOpen: true, alertList: {...alerts}})
            return
        }
        if(isInvalid)
            return

        try {
            const res = await Fetch(`${config.API_URL}/auth/register`, Method.POST, {user: user});
            if (res.status === 201) {
                setSnackbarValue(prevState => ({...prevState,
                    typeAlert: TypeAlert.success,
                    isOpen: true,
                    text: t('user.createdUser')
                }));
                setUser(defaultUser);
                return
            }
            if (res.status === 409) {
                setSnackbarValue(prevState => ({...prevState,
                    typeAlert: TypeAlert.warning,
                    isOpen: true,
                    text: t('user.busyName')
                }));
                setInvalidField(prev =>( {...prev,username:true}))
                return
            }
        }
        catch (e) {
            setSnackbarValue(prevState => ({...prevState,
                typeAlert: TypeAlert.error,
                isOpen: true,
                text: `${t('common.error')} ${e.toString()}`
            }));
            return
        }
        setSnackbarValue(prevState => ({...prevState,
            typeAlert: TypeAlert.error,
            isOpen: true,
            text: t('common.unknownError')
        }));
        return
    }

    useEffect(() =>{

    },[user])

    return(
        <BoxWide>
            <form onSubmit={handleSaveUser}>
            <div className={`${styles["user__row"]}`}>
                <Input
                    value={user.firstName}
                    onChange={updateUserValue}
                    id={`firstName`}
                    name={`firstName`}
                    type={TypeInput.text}
                    labelName={t('user.firstName')}
                    classWrap={`${styles["user__field-wrap"]}`}
                    showRequired={invalidField.firstName}
                />
                <Input
                    value={user.lastName}
                    onChange={updateUserValue}
                    id={`lastName`}
                    name={`lastName`}
                    type={TypeInput.text}
                    labelName={t('user.lastName')}
                    classWrap={`${styles["user__field-wrap"]}`}
                    showRequired={invalidField.lastName}
                />
                <Input
                    value={user.email}
                    onChange={updateUserValue}
                    id={`email`}
                    name={`email`}
                    type={TypeInput.text}
                    labelName={t('user.email')}
                    classWrap={`${styles["user__field-wrap"]}`}
                    showRequired={invalidField.email}
                />
                <Input
                    value={user.phoneNumber}
                    onChange={(e) => ValidPhone(e.target.value)? updateUserValue(e) : null}
                    id={`phoneNumber`}
                    name={`phoneNumber`}
                    type={TypeInput.text}
                    labelName={t('user.phoneNumber')}
                    classWrap={`${styles["user__field-wrap"]}`}

                />

            </div>

            <div className={`${styles["user__row"]}`}>
                <Input
                    value={user.username}
                    onChange={updateUserValue}
                    id={`username`}
                    name={`username`}
                    type={TypeInput.text}
                    labelName={t('user.username')}
                    classWrap={`${styles["user__field-wrap"]}`}
                    showRequired={invalidField.username}
                />
                <Input
                    value={user.password}
                    onChange={updateUserValue}
                    id={`password`}
                    name={`password`}
                    type={TypeInput.password}
                    labelName={t('user.password')}
                    classWrap={`${styles["user__field-wrap"]}`}
                    showRequired={invalidField.password}
                />
                <Input
                    value={user.repeatPassword}
                    onChange={updateUserValue}
                    id={`repeatPassword`}
                    name={`repeatPassword`}
                    type={TypeInput.password}
                    labelName={t('user.repeatPassword')}
                    classWrap={`${styles["user__field-wrap"]}`}
                    showRequired={invalidField.repeatPassword}
                />
                <AdminSelect
                    selectType={user.isAdmin}
                    updateAdmin={(isAdmin => {setUser(prevState => ({...prevState,isAdmin}))})}
                />

                <Button label={t('button.create')} typeAction={typeButtonAction.submit} typeButton={typeButton.normal} classWrap={`${styles["user__row--save-button-wrap"]}`}/>
            </div>
            </form>
            <Snackbar
                {...snackbarValue}
            />
            <SnackbarMultiAlert
                {...alertList}
            />
        </BoxWide>
    )
}
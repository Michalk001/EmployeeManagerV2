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
import {ISnackbarMultiAlert, SnackbarMultiAlert, TypeAlert} from "../../snackbar";


import styles from "./style.module.scss"
import {typeValidUserForm, ValidPhone, ValidUserForm} from "../../../utiles/valid";
import {AdminSelect} from "../../common";
import {Fetch, Method} from "../../../utiles/Fetch";
import config from "../../../utiles/config.json";

const defaultInvalidField = {
    firstName:false,
    lastName:false,
    email:false,
    newPassword:false
}

const defaultUser:IUserProfile= {
    projects:[],
    email:"",
    firstName:"",
    lastName:"",
    status:"",
    username:"",
    phoneNumber:null,
    isAdmin:false,
}

export const Editor = () =>{

    const {id} = useParams<{id:string}>()
    const isMounted = React.useRef(false);
    const [invalidField, setInvalidField] = useState(defaultInvalidField)
    const { state } = useContext(GlobalContext)
    const [user,setUser] = useState<IUserProfile>(defaultUser)
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
        if(state.accountState.userData && user.username === "") {
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
        items.push({
            type : typeButton.update,
            show : ShowType.AdminOrUser,
            label: "Zaktualizuj",
            onClick: handleUpdateUser,
        })
        items.push({
            type : typeButton.normal,
            show : ShowType.ADMIN,
            label: "Zarchiwizuj",
            onClick: () => {},
        })
        items.push({
            type : typeButton.remove,
            show : ShowType.ADMIN,
            label: "Usuń",
            onClick: () => {},
        })
        return items
    }

    const updateUserValue = (e:ChangeEvent<HTMLInputElement>) =>{
        if(user)
            setUser(prevState => ({...prevState,[e.target.name]:e.target.value}))
    }


    const handleUpdateUser = async () =>{
        setInvalidField(defaultInvalidField);
        setAlertList({...alertList, isOpen: false, alertList: []})
        const {isInvalid,alerts} = ValidUserForm(user,typeValidUserForm.EDIT_USER)

        if(isInvalid){
            alerts.push({text:`requireField`})
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
                        text: "Zaktualizowano"
                       }]
                }));
                return
            }
            if (res.status === 404) {
                setAlertList(prevState => ({...prevState,
                    typeAlert: TypeAlert.warning,
                    isOpen: true,
                    alertList:[{
                        text: "Nie znaleziono"
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
                    text: `Błąd: ${e.toString()}`
                }]
            }));
            return
        }

        setAlertList(prevState => ({...prevState,
            typeAlert: TypeAlert.error,
            isOpen: true,
            alertList:[{
                text: `Wystąpił nieznany błąd`
            }]

        }));
    }

    const handleChangePassword = async () =>{
        const res = await Fetch(`${config.API_URL}/auth/changePassword/${user.username}`,Method.PUT, {...changePasswordValue})
        if(res.status === 200){
            setAlertList(prevState => ({...prevState,
                typeAlert: TypeAlert.success,
                isOpen: true,
                alertList:[{
                    text: `Change Password`
                }]

            }));
        }else{
            setAlertList(prevState => ({...prevState,
                typeAlert: TypeAlert.error,
                isOpen: true,
                alertList:[{
                    text: `Error`
                }]

            }));
        }
    }

    const updateChangePassword = (e:ChangeEvent<HTMLInputElement>) =>{
        setChangeNewPasswordValue(prevState => ({...prevState,[e.target.name]:e.target.value}))
    }

    return(
        <BoxWide>
            <ButtonOptionsBar
                items={getButtonsBar()}
                usernameProfile={user.username}
            />
            {user.username !== "" && <>
                <div className={`${styles[`user-profile__row`]}`} >
                    <Input
                        value={user.firstName}
                        onChange={updateUserValue}
                        id={`firstName`}
                        name={`firstName`}
                        type={TypeInput.text}
                        labelName={`FirstName`}
                        classWrap={`${styles[`admin-user__field-wrap`]}`}
                        showRequired={invalidField.firstName}
                    />
                    <Input
                        value={user.lastName}
                        onChange={updateUserValue}
                        id={`lastName`}
                        name={`lastName`}
                        type={TypeInput.text}
                        labelName={`LastName`}
                        classWrap={`${styles[`admin-user__field-wrap`]}`}
                        showRequired={invalidField.lastName}
                    />
                    <Input
                        value={user.email}
                        onChange={updateUserValue}
                        id={`email`}
                        name={`email`}
                        type={TypeInput.text}
                        labelName={`Email`}
                        classWrap={`${styles[`admin-user__field-wrap`]}`}
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
                        labelName={`Phone Number`}
                        classWrap={`${styles[`admin-user__field-wrap`]}`}
                    />
                    {state.accountState.userData?.isAdmin && <AdminSelect
                        selectType={user.isAdmin}
                        updateAdmin={(isAdmin => {
                            setUser(prevState => ({...prevState, isAdmin}))
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
                        labelName={`Old Password`}
                        classWrap={`${styles[`admin-user__field-wrap`]}`}
                    ///    showRequired={invalidField.newPassword}
                    />
                    <Input
                        value={changePasswordValue.newPassword}
                        onChange={updateChangePassword}
                        id={`newPassword`}
                        name={`newPassword`}
                        type={TypeInput.password}
                        labelName={`New Password`}
                        classWrap={`${styles[`admin-user__field-wrap`]}`}
                     ///   showRequired={invalidField.newPassword}
                    />
                    <Input
                        value={changePasswordValue.repeatNewPassword}
                        onChange={updateChangePassword}
                        id={`repeatNewPassword`}
                        name={`repeatNewPassword`}
                        type={TypeInput.password}
                        labelName={`Repeat New Password`}
                        classWrap={`${styles[`admin-user__field-wrap`]}`}
                       // showRequired={invalidField.newPassword}
                    />
                    <Button
                        label={`Change Password`}
                        typeAction={typeButtonAction.button}
                        typeButton={typeButton.normal}
                        classWrap={`${styles[`user-profile__item`]}`}
                        onClick={handleChangePassword}
                    />
                </div>
            </>}
            <ListItemRow
                label={`Aktywne Projekty`}
                items={getProjectOfItemList(user.projects.filter(project => project.isActive))}

            />
            <SnackbarMultiAlert
                {...alertList}
            />
        </BoxWide>
    )

}
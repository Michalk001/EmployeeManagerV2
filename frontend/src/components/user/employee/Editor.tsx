import React, {ChangeEvent, useContext, useEffect, useState} from "react"
import {useParams} from "react-router";
import {BoxWide} from "../../../utiles/box/Wide";
import {IUserProfile} from "./duck/types";
import {GlobalContext} from "../../../context/Provider";
import {getProjectOfItemList, getUser} from "./duck/operations";
import {Button, typeButton, typeButtonAction} from "../../button";

import {Input, TypeInput} from "../../InputField";
import {ListItemRow, ShowType} from "../common";
import {ButtonOptionsBar} from "../common/ButtonOptionsBar";
import {IButtonBarOptions} from "../common/types";
import {ISnackbarMultiAlert, SnackbarMultiAlert, TypeAlert} from "../../snackbar";


import "./style.scss"
import {typeValidUserForm, ValidPhone, ValidUserForm} from "../../../utiles/valid";
import {AdminSelect} from "../../common";

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

    const isMounted = React.useRef(false);
    const [invalidField, setInvalidField] = useState(defaultInvalidField)
    const { state } = useContext(GlobalContext)
    const [user,setUser] = useState<IUserProfile>(defaultUser)
    const [newPassword,setNewPassword] = useState("");

    const handleClose = () =>{
        setAlertList(prevState =>( {...prevState,isOpen:false}))
    }

    const [alertList,setAlertList] = useState<ISnackbarMultiAlert>({
        hideDuration:1000,
        alertList:[],
        isOpen:false,
        typeAlert:TypeAlert.error,
        onClose: handleClose
    })

    const {id} = useParams<{id:string}>()

    const getDataUser = async () =>{
        if(state.accountState.userData && user.username === "") {
            const data = await getUser(id ? id : state.accountState.userData.username);

            setUser(data )
        }
    }

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
            setAlertList({...alertList, isOpen: true, alertList: alerts})
            return
        }
    }



    useEffect(()=>{
        isMounted.current = true
        if(isMounted.current) {
            getDataUser();
        }
        return () =>{isMounted.current = false}
    },[state.accountState.userData])


    return(
        <BoxWide>
            <ButtonOptionsBar
                items={getButtonsBar()}
                usernameProfile={user.username}
            />
            {user.username !== "" && <>
                <div className={`user-profile__row`} >
                    <Input
                        value={user.firstName}
                        onChange={updateUserValue}
                        id={`firstName`}
                        name={`firstName`}
                        type={TypeInput.text}
                        labelName={`FirstName`}
                        classWrap={`admin-user__field-wrap`}
                        showRequired={invalidField.firstName}
                    />
                    <Input
                        value={user.lastName}
                        onChange={updateUserValue}
                        id={`lastName`}
                        name={`lastName`}
                        type={TypeInput.text}
                        labelName={`LastName`}
                        classWrap={`admin-user__field-wrap`}
                        showRequired={invalidField.lastName}
                    />
                    <Input
                        value={user.email}
                        onChange={updateUserValue}
                        id={`email`}
                        name={`email`}
                        type={TypeInput.text}
                        labelName={`Email`}
                        classWrap={`admin-user__field-wrap`}
                        showRequired={invalidField.email}
                    />


                </div>
                <div className={`user-profile__row`}>
                    <Input
                        value={user.phoneNumber ? user.phoneNumber: ""}
                        onChange={(e) => ValidPhone(e.target.value)? updateUserValue(e) : null}
                        id={`phoneNumber`}
                        name={`phoneNumber`}
                        type={TypeInput.text}
                        labelName={`Phone Number`}
                        classWrap={`admin-user__field-wrap`}
                    />
                    {state.accountState.userData?.isAdmin && <AdminSelect
                        selectType={user.isAdmin}
                        updateAdmin={(isAdmin => {
                            setUser(prevState => ({...prevState, isAdmin}))
                        })}
                    />}
                </div>
                <div className={`user-profile__row user-profile__item--top-line`}>
                    <Input
                        value={newPassword}
                        onChange={updateUserValue}
                        id={`newPassword`}
                        name={`newPassword`}
                        type={TypeInput.password}
                        labelName={`New Password`}
                        classWrap={`admin-user__field-wrap`}
                        showRequired={invalidField.newPassword}
                    />
                    <Button
                        label={`Change Password`}
                        typeAction={typeButtonAction.button}
                        typeButton={typeButton.normal}
                        classWrap={`user-profile__item`}
                    />
                </div>
            </>}
            <ListItemRow
                label={`Aktywne Projekty`}
                items={getProjectOfItemList(user.projects.filter(project => !project.isRemove))}

            />
            <SnackbarMultiAlert
                {...alertList}
            />
        </BoxWide>
    )

}
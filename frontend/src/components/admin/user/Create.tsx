import React, {ChangeEvent, useEffect, useState} from "react";
import './style.scss'
import {BoxWide} from "../../../utiles/box/Wide";
import {Input, TypeInput} from "../../InputField";
import {IUserNew} from "./duck/types";
import {Button, typeButton, typeButtonAction} from "../../button";
import {ISnackbarMultiAlert, Snackbar, SnackbarMultiAlert, TypeAlert, IAlertList, ISnackbar} from "../../snackbar";
import {Fetch, Method} from "../../../utiles/Fetch";
import config from "../../../utiles/config.json"
import {IInvalidUserForm, typeValidUserForm, ValidUserForm} from "../../../utiles/valid";




const defaultUser:IUserNew ={
    firstName:"",
    lastName:"",
    username:"",
    email:"",
    password:"",
    isAdmin:false,
    phoneNumber:""
}
const defaultInvalidField = {
    password:false,
    firstName:false,
    lastName:false,
    email:false,
    username:false,
    phoneNumber: false

}


export const Create = () =>{

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
    const updateIsAdmin= (e:ChangeEvent<HTMLInputElement>) =>{
        if(e.target.value === "true")
            setUser(prevState => ({...prevState,[e.target.name]:true}))
        else
            setUser(prevState => ({...prevState,[e.target.name]:false}))
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
                    text: "Utworzono użytkownika"
                }));
                setUser(defaultUser);
                return
            }
            if (res.status === 409) {
                setSnackbarValue(prevState => ({...prevState,
                    typeAlert: TypeAlert.warning,
                    isOpen: true,
                    text: "Nazwa zajęta"
                }));
                setInvalidField(prev =>( {...prev,username:true}))
                return
            }
        }
        catch (e) {
            setSnackbarValue(prevState => ({...prevState,
                typeAlert: TypeAlert.error,
                isOpen: true,
                text: `Błąd ${e.toString()}`
            }));
            return
        }
        setSnackbarValue(prevState => ({...prevState,
            typeAlert: TypeAlert.error,
            isOpen: true,
            text: `Wystąpił nieznany błąd`
        }));
        return
    }

    useEffect(() =>{

    },[user])

    return(
        <BoxWide>
            <form onSubmit={handleSaveUser}>
            <div className={`admin-user__row`}>
                <Input
                    value={user.firstName}
                    onChange={updateUserValue}
                    id={`firstName`}
                    name={`firstName`}
                    type={TypeInput.text}
                    labelName={`First Name`}
                    classWrap={`admin-user__field-wrap`}
                    showRequired={invalidField.firstName}
                />
                <Input
                    value={user.lastName}
                    onChange={updateUserValue}
                    id={`lastName`}
                    name={`lastName`}
                    type={TypeInput.text}
                    labelName={`Last Name`}
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
                <Input
                    value={user.phoneNumber}
                    onChange={updateUserValue}
                    id={`phoneNumber`}
                    name={`phoneNumber`}
                    type={TypeInput.text}
                    labelName={`Phone Number`}
                    classWrap={`admin-user__field-wrap`}
                   // showRequired={invalidField.phoneNumber}
                />

            </div>

            <div className={`admin-user__row`}>
                <Input
                    value={user.username}
                    onChange={updateUserValue}
                    id={`username`}
                    name={`username`}
                    type={TypeInput.text}
                    labelName={`Username`}
                    classWrap={`admin-user__field-wrap`}
                    showRequired={invalidField.username}
                />
                <Input
                    value={user.password}
                    onChange={updateUserValue}
                    id={`password`}
                    name={`password`}
                    type={TypeInput.password}
                    labelName={`Password`}
                    classWrap={`admin-user__field-wrap`}
                    showRequired={invalidField.password}
                />
                <div className={`admin-user__field-wrap admin-user__field-wrap--select-admin`}>
                    <label  className={`admin-user__radio-button--title`}>Admin</label>
                    <div className={`admin-user__radio-button--wrap`}>
                        <label className={`admin-user__radio-button ${user.isAdmin ? `admin-user__radio-button--active`: ``}  `}
                               htmlFor={`isAdminTrue`}
                        >
                            YES
                        </label>
                        <input
                            className={`admin-user__radio-button--input`}
                            id="isAdminTrue"
                            name="isAdmin" value={"true"}
                            type="radio"
                            onChange={updateIsAdmin}

                        />
                        <label className={`admin-user__radio-button  ${!user.isAdmin ? `admin-user__radio-button--active`: ``} `}
                               htmlFor={`isAdminFalse`}
                        >
                            NO
                        </label>
                        <input
                            className={`admin-user__radio-button--input`}
                            id="isAdminFalse"
                            name="isAdmin" value={"false"}
                            type="radio"
                            onChange={updateIsAdmin}
                        />

                    </div>
                </div>

                <Button label={`Zapisz`} typeAction={typeButtonAction.submit} typeButton={typeButton.normal} classWrap={`admin-user__row--save-button-wrap`}/>
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
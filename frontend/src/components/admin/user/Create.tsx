import React, {ChangeEvent, useEffect, useState} from "react";
import './style.scss'
import {BoxWide} from "../../../utiles/box/Wide";
import {Input, TypeInput} from "../../InputField";
import {IUserNew} from "./duck/types";
import {Button, typeButton, typeButtonAction} from "../../button";
import {Fetch, Method} from "../../../utiles/Fetch";
import {Snackbar, TypeAlert} from "../../snackbar";
import config from '../../../utiles/config.json'


const defaultUser:IUserNew ={
    firstName:"",
    lastName:"",
    username:"",
    email:"",
    password:"",
    isAdmin:false
}


export const Create = () =>{

    const [user, setUser] = useState(defaultUser);
    const [snackbarValue, setSnackbarValue] = useState({
        text:"",
        isOpen:false,
        type:TypeAlert.info
    })
    const updateUserValue = (e:ChangeEvent<HTMLInputElement>) =>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const updateIsAdmin= (e:ChangeEvent<HTMLInputElement>) =>{
        if(e.target.value === "true")
            setUser({...user,[e.target.name]:true})
        else
            setUser({...user,[e.target.name]:false})
    }

    const saveUser = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try {
            const res = await Fetch(`${config.API_URL}/auth/register`, Method.POST, {user: user});
            if (res.status === 201) {
                setSnackbarValue({
                    type: TypeAlert.success,
                    isOpen: true,
                    text: "Utworzono użytkownika"
                });
                setUser(defaultUser);
                return
            }
            if (res.status === 409) {
                setSnackbarValue({
                    type: TypeAlert.warning,
                    isOpen: true,
                    text: "Nazwa zajęta"
                });
                return
            }
        }
        catch (e) {
            setSnackbarValue({
                type: TypeAlert.error,
                isOpen: true,
                text: `${e.toString()}`
            });
            return
        }
        setSnackbarValue({
            type: TypeAlert.error,
            isOpen: true,
            text: `Wystąpił nieznany błąd`
        });
    }

    useEffect(() =>{

    },[user])

    return(
        <BoxWide>
            <form onSubmit={saveUser}>
            <div className={`admin-user__row`}>
                <Input
                    value={user.firstName}
                    onChange={updateUserValue}
                    id={`firstName`}
                    name={`firstName`}
                    type={TypeInput.text}
                    labelName={`FirstName`}
                    classWrap={`admin-user__field-wrap`}
                />
                <Input
                    value={user.lastName}
                    onChange={updateUserValue}
                    id={`lastName`}
                    name={`lastName`}
                    type={TypeInput.text}
                    labelName={`LastName`}
                    classWrap={`admin-user__field-wrap`}
                />
                <Input
                    value={user.email}
                    onChange={updateUserValue}
                    id={`email`}
                    name={`email`}
                    type={TypeInput.text}
                    labelName={`Email`}
                    classWrap={`admin-user__field-wrap`}
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
                />
                <Input
                    value={user.password}
                    onChange={updateUserValue}
                    id={`password`}
                    name={`password`}
                    type={TypeInput.password}
                    labelName={`Password`}
                    classWrap={`admin-user__field-wrap`}
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
                text={snackbarValue.text}
                isOpen={snackbarValue.isOpen}
                onClose={() => setSnackbarValue({...snackbarValue,isOpen: false})}
                hideDuration={3000}
                typeAlert={snackbarValue.type}
            />
        </BoxWide>
    )
}
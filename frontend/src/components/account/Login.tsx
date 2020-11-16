import React, {ChangeEvent, FormEvent, useContext, useState} from "react";

import "./style.scss"
import {decodeUserToken, fetchLogin, saveTokenToCookies} from "./duck/operations";
import {setUserData} from "./duck/actions";
import {GlobalContext} from "../../context/Provider";
import {Button, typeButton, typeButtonAction} from "../button";
import {Input, TypeInput} from "../InputField";


export const Login = () =>{

    const { state, dispatch } = useContext(GlobalContext)

    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setLoginData] = useState({username:"",password:""})
    const [requireFieldError, setRequireFieldError] = useState({username:false,password:false})

    const handleUpdateLoginData = (e:ChangeEvent<HTMLInputElement>) =>{
        setLoginData(prev =>( {...prev,[e.target.name]:e.target.value}))
        setRequireFieldError(prev => ({...prev,[e.target.name]: false}))
    }

    const handleSubmitForm = async (event:FormEvent) =>{
        event.preventDefault();
        let breakSubmit = false;
        if(loginData.username.trim() === "") {
            setRequireFieldError(prev => ({...prev, username: true}));
            breakSubmit = true;
        }
        if(loginData.password.trim() === "") {
            setRequireFieldError(prev => ({...prev, password: true}));
            breakSubmit = true;
        }
        if(breakSubmit)
            return
        const response = await fetchLogin(loginData.username,loginData.password);
        if(response.status === 200) {
            const jsonRes = await response.json();
            dispatch(setUserData(decodeUserToken(jsonRes.token)))

            saveTokenToCookies(jsonRes.token)
        }


    }

    return <div className={`account account--login`}>
        <form  className={`account__container`} onSubmit={handleSubmitForm}>

            <Input
                value={loginData.username}
                onChange={handleUpdateLoginData}
                id={`username`}
                name={`username`}
                placeholder={`username`}
                type={TypeInput.text}
                classWrap={`account__input-section`}
                classInput={`account__input`}
            />

            <Input
                value={loginData.password}
                onChange={handleUpdateLoginData}
                id={`password`}
                name={`password`}
                placeholder={`password`}
                type={TypeInput.password}
                classWrap={`account__input-section`}
                classInput={`account__input`}
            />
            <Button label={"Zaloguj"} typeAction={typeButtonAction.submit} typeButton={typeButton.normal} classWrap={`account__button--position`} />

        </form>

    </div>
}
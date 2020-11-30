import React, {ChangeEvent, FormEvent, useContext, useState, } from "react";

import styles from "./style.module.scss"
import {decodeUserToken, fetchLogin, saveTokenToCookies} from "./duck/operations";
import {setUserData} from "./duck/actions";
import {GlobalContext} from "../../context/Provider";
import {Button, typeButton, typeButtonAction} from "../button";
import {Input, TypeInput} from "../InputField";
import { useHistory } from "react-router-dom"
import {AppRoute} from "../../routing/AppRoute.enum";
import {ISnackbarMultiAlert, SnackbarMultiAlert, TypeAlert} from "../snackbar";

const defaultInvalidField = {
    username:false,
    password:false
}

export const Login = () =>{

    const { dispatch } = useContext(GlobalContext)

    const [loginData, setLoginData] = useState({username:"",password:""})
    const history = useHistory();
    const [invalidField, setInvalidField] = useState(defaultInvalidField)
    const [alertList,setAlertList] = useState<ISnackbarMultiAlert>({
        hideDuration:5000,
        alertList:[],
        isOpen:false,
        typeAlert:TypeAlert.warning,
        onClose: () =>{ setAlertList(prevState =>( {...prevState,isOpen:false}))}
    })

    const handleUpdateLoginData = (e:ChangeEvent<HTMLInputElement>) =>{
        setLoginData(prev =>( {...prev,[e.target.name]:e.target.value}))

    }

    const handleSubmitForm = async (event:FormEvent) =>{
        event.preventDefault();
        setAlertList({...alertList, isOpen: false, alertList:[]})
        setInvalidField(defaultInvalidField)
        let isInvalid = false
        if(loginData.username.trim() === ""){
            isInvalid= true
            setInvalidField(prevState => ({...prevState,username: true}))
        }
        if(loginData.password.trim() === ""){
            isInvalid= true
            setInvalidField(prevState => ({...prevState,password: true}))
        }
        if(isInvalid)
            return
        try {
            const response = await fetchLogin(loginData.username,loginData.password);
            if(response.status === 200) {
                const jsonRes = await response.json();
                dispatch(setUserData(decodeUserToken(jsonRes.token)))
                saveTokenToCookies(jsonRes.token)
                history.push(AppRoute.homePage)
                return
            }
            if(response.status === 401){
                setAlertList({...alertList, isOpen: true, alertList: [{text: `Wrong login or password`}]})
                return
            }
        }catch (e) {
            setAlertList({...alertList, isOpen: true, alertList: [{text: `Error ${e}`}]})
        }
        setAlertList({...alertList, isOpen: true, alertList: [{text: `Unknown Error`}]})



    }

    return <div className={`${styles[`account`]} ${styles[`account--login`]}`}>
        <form  className={`${styles[`account__container`]}`} onSubmit={handleSubmitForm}>

            <Input
                value={loginData.username}
                onChange={handleUpdateLoginData}
                id={`username`}
                name={`username`}
                placeholder={`username`}
                type={TypeInput.text}
                classWrap={`${styles[`account__input-section`]} ${invalidField.username && `${styles[`account__input--required`]}`}`}
                classInput={`${styles[`account__input`]}`}

            />

            <Input
                value={loginData.password}
                onChange={handleUpdateLoginData}
                id={`password`}
                name={`password`}
                placeholder={`password`}
                type={TypeInput.password}
                classWrap={`${styles[`account__input-section`]} ${invalidField.username && `${styles[`account__input--required`]}`}`}
                classInput={`${styles[`account__input`]}`}

            />
            <Button label={"Login"} typeAction={typeButtonAction.submit} typeButton={typeButton.normal} classWrap={`${styles[`account__button--position`]}`} />

        </form>
        <SnackbarMultiAlert
            {...alertList}
        />
    </div>
}
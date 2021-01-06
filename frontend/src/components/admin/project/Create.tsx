import React, {ChangeEvent, useEffect, useState} from "react";
import {BoxWide} from "../../box/Wide";


import {IProjectNew, IUser} from "./duck/types"
import {Input, InputSelect, InputTextarea, TypeInput} from "../../InputField";
import {Button, typeButton, typeButtonAction} from "../../button";

import styles from './style.module.scss'
import {optionType} from "../../InputField/InputSelect";
import {ValueType} from "react-select";
import {Fetch, FetchGet, Method} from "../../../utiles/Fetch";
import config from '../../../utiles/config.json'
import {ISnackbar, Snackbar, TypeAlert} from "../../snackbar";
import {ValidIsEmpty} from "../../../utiles/valid";
import {useTranslation} from "react-i18next";


const defaultProjectValue: IProjectNew = {
    description: "",
    name : "",
    users: []
}

const defaultInvalidField = {
    name:false

}

export const Create = () =>{
    const isMounted = React.useRef(false);
    const [userOptionsSelect, setUserOptionsSelect] = useState<optionType[]>([])
    const [projectValue, setProjectValue] = useState<IProjectNew>(defaultProjectValue);
    const [selectUserValue, setSelectUserValue] = useState<optionType[]>([])
    const [invalidField, setInvalidField] = useState(defaultInvalidField)
    const {t} = useTranslation('common');
    const [snackbarValue, setSnackbarValue] = useState<ISnackbar>({
        text:"",
        isOpen:false,
        typeAlert:TypeAlert.error,
        hideDuration:4000,
        onClose:() => setSnackbarValue(prevState =>( {...prevState,isOpen: false}))
    })

    const getUser = async () =>{
        const res = await FetchGet(`${config.API_URL}/user/`);
        const users:IUser[] = await res.json()
        setUserOptionsSelect(users.map((user):optionType =>{
            return{
                value: user.username,
                label: `${user.firstName} ${user.lastName}`
            }
        }))
    }


    const updateValue = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>{
        setProjectValue(prevState =>( {...prevState, [e.target.name]: e.target.value}))
    }

    const updateSelectValue = (e: ValueType<optionType>) =>{
        if(Array.isArray(e)){
            const valueSelect = e.map(item => item.value)
            setProjectValue(prevState => ({...prevState,users:valueSelect}))
            setSelectUserValue(e)
        }
        else {
            setSelectUserValue([])
        }


    }

    const saveProject = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        let isInvalid = false;
        if(ValidIsEmpty(projectValue.name)){
            setInvalidField(prevState => ({...prevState,name: true}))
            isInvalid = true;
        }
        if(isInvalid)
            return
        try{
            const res = await Fetch(`${config.API_URL}/project`,Method.POST, {project:projectValue})
            if (res.status === 201) {
                setSnackbarValue(prevState=>({
                    ...prevState,
                    typeAlert: TypeAlert.success,
                    isOpen: true,
                    text: t('project.createdProject')
                }));
                setProjectValue(defaultProjectValue);
                return
            }

        }
        catch (e) {
            setSnackbarValue(prevState=>({
                ...prevState,
                typeAlert: TypeAlert.error,
                isOpen: true,
                text: `${e.toString()}`
            }));
            return
        }

        setSnackbarValue(prevState=>({
            ...prevState,
            typeAlert: TypeAlert.error,
            isOpen: true,
            text: t('common.unknownError')
        }));

    }


    useEffect(() =>{
        isMounted.current = true
        if(isMounted.current) {
            getUser();
        }
        return () =>{isMounted.current = false}


    },[])

    return (
        <BoxWide>
            <form onSubmit={saveProject}>
                <Input
                    value={projectValue.name}
                    onChange={updateValue}
                    id={`name`}
                    name={`name`}
                    labelName={t('project.name')}
                    type={TypeInput.text}
                    classWrap={`${styles[`project__field`]}`}
                    showRequired={invalidField.name}
                />
                <InputTextarea
                    value={projectValue.description}
                    onChange={updateValue}
                    name={`description`}
                    id={`description`}
                    labelName={t('project.description')}
                    classWrap={`${styles[`project__field`]} ${styles[`project__field--description`]}`}

                />
                <InputSelect
                    options={userOptionsSelect}
                    isMulti={true}
                    value={selectUserValue}
                    onChange={updateSelectValue}
                    id={'employees'}
                    labelName={t('project.assignedEmployees')}
                    classWrap={`project__field`}
                    placeholder={t('project.noEmployees')}
                />
                <Button
                    label={t('button.create')}
                    typeAction={typeButtonAction.submit}
                    typeButton={typeButton.normal}
                    classWrap={`${styles[`project__button-save-position`]}`}
                />
            </form>
            <Snackbar
                {...snackbarValue}
            />
        </BoxWide>
    )
}
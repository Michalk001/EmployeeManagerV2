import React, {ChangeEvent, useEffect, useState} from "react";
import {BoxWide} from "../../../utiles/box/Wide";


import {IProjectNew, IUser} from "./duck/types"
import {Input, InputSelect, InputTextarea, TypeInput} from "../../InputField";
import {Button, typeButton, typeButtonAction} from "../../button";

import './style.scss'
import {optionType} from "../../InputField/InputSelect";
import {ValueType} from "react-select";
import {Fetch, FetchGet, Method} from "../../../utiles/Fetch";
import config from '../../../utiles/config.json'
import {ISnackbar, Snackbar, TypeAlert} from "../../snackbar";
import {ValidIsEmpty} from "../../../utiles/valid";


const defaultProjectValue: IProjectNew = {
    description: "",
    name : "",
    users: []
}

const defaultInvalidField = {
    name:false

}

export const Create = () =>{

    const [userOptionsSelect, setUserOptionsSelect] = useState<optionType[]>([])
    const [projectValue, setProjectValue] = useState<IProjectNew>(defaultProjectValue);
    const [selectUserValue, setSelectUserValue] = useState<optionType[]>([])
    const [invalidField, setInvalidField] = useState(defaultInvalidField)

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
                    text: "Create Project"
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
            text: `Unknown Error`
        }));

    }


    useEffect(() =>{
         getUser();

    },[])

    return (
        <BoxWide>
            <form onSubmit={saveProject}>
                <Input
                    value={projectValue.name}
                    onChange={updateValue}
                    id={`name`}
                    name={`name`}
                    labelName={"Name"}
                    type={TypeInput.text}
                    classWrap={`admin-project__field`}
                    showRequired={invalidField.name}
                />
                <InputTextarea
                    value={projectValue.description}
                    onChange={updateValue}
                    name={`description`}
                    id={`description`}
                    labelName={`Description`}
                    classWrap={`admin-project__field admin-project__field--description`}

                />
                <InputSelect
                    options={userOptionsSelect}
                    isMulti={true}
                    value={selectUserValue}
                    onChange={updateSelectValue}
                    id={'employees'}
                    labelName={`Assigned Employees`}
                    classWrap={`admin-project__field`}
                    placeholder={"No Employees"}
                />
                <Button
                    label={"Create"}
                    typeAction={typeButtonAction.submit}
                    typeButton={typeButton.normal}
                    classWrap={`admin-project__button-save-position`}
                />
            </form>
            <Snackbar
                {...snackbarValue}
            />
        </BoxWide>
    )
}
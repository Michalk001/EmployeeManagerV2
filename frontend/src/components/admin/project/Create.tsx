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


const defaultProjectValue: IProjectNew = {
    description: "",
    name : "",
    users: []
}

export const Create = () =>{

    const [userOptionsSelect, setUserOptionsSelect] = useState<optionType[]>([])
    const [projectValue, setProjectValue] = useState<IProjectNew>(defaultProjectValue);
    const [selectUserValue, setSelectUserValue] = useState<optionType[]>([])


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
        setProjectValue({...projectValue, [e.target.name]: e.target.value})
    }

    const updateSelectValue = (e: ValueType<optionType>) =>{
        if(Array.isArray(e)){
            const valueSelect = e.map(item => item.value)
            setProjectValue({...projectValue,users:valueSelect})
            setSelectUserValue(e)
        }
        else {
            setSelectUserValue([])
        }


    }

    const saveProject = async (e:React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        const res = await Fetch(`${config.API_URL}/project`,Method.POST, {project:projectValue})
        console.log(res.status)
    }

     useEffect(() =>{
            console.log(userOptionsSelect)
     },[userOptionsSelect,selectUserValue])

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
                    placeholder={`Nazwa`}
                    labelName={"Nazwa"}
                    type={TypeInput.text}
                    classWrap={`admin-project__field`}
                />
                <InputTextarea
                    value={projectValue.description}
                    onChange={updateValue}
                    name={`description`}
                    id={`description`}
                    labelName={`Opis`}
                    classWrap={`admin-project__field admin-project__field--description`}

                />
                <InputSelect
                    options={userOptionsSelect}
                    isMulti={true}
                    value={selectUserValue}
                    onChange={updateSelectValue}
                    id={'employees'}
                    labelName={`Przydzieleni Pracownicy`}
                    classWrap={`admin-project__field`}
                />
                <Button
                    label={"Zapisz"}
                    typeAction={typeButtonAction.submit}
                    typeButton={typeButton.normal}
                    classWrap={`admin-project__button-save-position`}
                />
            </form>
        </BoxWide>
    )
}
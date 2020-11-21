import React, {ChangeEvent, FC, useState} from "react";

import styles from './style.module.scss'
import {TypeInput} from "./duck/types";

interface Iprops {

    value:string|number|undefined,
    onChange: (e:ChangeEvent<HTMLInputElement>) => void
    placeholder?:string,
    classInput?:string,
    classWrap?:string,
    classInputError?:string,
    id:string,
    name:string,
    labelName?:string
    type:TypeInput
    showRequired?:boolean
}

 const Input:FC<Iprops> = (props) =>{

    const {classInputError,classInput,id,name,value,onChange,placeholder="",labelName,classWrap="",type,showRequired} = props
    const [showPassword, setShowPassword] = useState(false);

    const setType = (type: TypeInput):TypeInput =>{
        if(type === TypeInput.password){
            return showPassword ?  TypeInput.text : TypeInput.password
        }

        return  TypeInput.text
     }

    return <div className={`${styles["input__wrap"]} ${classWrap}`}>
        {labelName &&
            <label
                htmlFor={id}
                className={`${styles["input__label"]} ${showRequired ? (classInputError ? classInputError : `${styles[`input__label--required`]}`) : ``}`}
            >
                {labelName}
            </label>
        }
        <input
            id={id}
            name={name}
            type={setType(type)}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={` ${classInput ? classInput : `${styles[`input`]}`} ${showRequired ? `${styles[`input--required`]}` :``} ${ type === TypeInput.password ? `${styles[`input--password`]}` : ``}`}
        />
        {
            type === TypeInput.password &&
            <i onClick={() => setShowPassword(prev => !prev)}
            className={`${styles[`input__ico-eye`]} fas fa-eye ${!showPassword ? `fa-eye` : `fa-eye-slash`}`}/>
        }
    </div>
}

export default Input;
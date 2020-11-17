import React, {ChangeEvent, FC, useState} from "react";

import './style.scss'
import {TypeInput} from "./types";

interface Iprops {

    value:string|number|undefined,
    onChange: (e:ChangeEvent<HTMLInputElement>) => void
    placeholder?:string,
    classInput?:string,
    classWrap?:string,
    id:string,
    name:string,
    labelName?:string
    type:TypeInput
    showRequired?:boolean
}

 const Input:FC<Iprops> = (props) =>{

    const {classInput,id,name,value,onChange,placeholder,labelName,classWrap,type,showRequired} = props
    const [showPassword, setShowPassword] = useState(false);

    const setType = (type: TypeInput):TypeInput =>{
        if(type === TypeInput.password){
            return showPassword ?  TypeInput.text : TypeInput.password
        }

        return  TypeInput.text
     }

    return <div className={`input__wrap ${classWrap}`}>
        {labelName &&
            <label
                htmlFor={id}
                className={`input__label ${showRequired ? `input__label--required` :``}`}
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
            className={` ${classInput ? classInput : `input`} ${showRequired ? `input--required` :``} ${ type === TypeInput.password ? 'input--password' : ``}`}
        />
        {
            type === TypeInput.password &&
            <i onClick={() => setShowPassword(prev => !prev)}
            className={`input__ico-eye fas fa-eye ${!showPassword ? `fa-eye` : `fa-eye-slash`}`}/>
        }
    </div>
}

export default Input;
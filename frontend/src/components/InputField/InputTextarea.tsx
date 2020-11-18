import React, {ChangeEvent, FC} from "react";
import {TypeInput} from "./types";


interface Iprops {

    value:string|number|undefined,
    onChange: (e:ChangeEvent<HTMLTextAreaElement>) => void
    placeholder?:string,
    classTextarea?:string,
    classWrap?:string,
    id:string,
    name:string,
    labelName?:string
}
const InputTextarea:FC<Iprops> = (props) =>{

    const {value,onChange,name,id,classTextarea,classWrap="",labelName,placeholder} = props;

    return (
        <div className={`input__wrap ${classWrap}`}>
            {labelName &&
            <label
                htmlFor={id}
                className={`input__label`}
            >
                {labelName}
            </label>
            }
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={` ${classTextarea ? classTextarea : `input input--textarea`}`}
                placeholder={placeholder}
            />
        </div>
    )
}
export default InputTextarea
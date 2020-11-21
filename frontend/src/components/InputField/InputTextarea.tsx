import React, {ChangeEvent, FC} from "react";
import styles from "./style.module.scss"

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
        <div className={`${styles[`input__wrap`]} ${classWrap}`}>
            {labelName &&
            <label
                htmlFor={id}
                className={`${styles[`input__label`]}`}
            >
                {labelName}
            </label>
            }
            <textarea
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                className={` ${classTextarea ? classTextarea : `${styles[`input`]} ${styles[`input--textarea`]}`}`}
                placeholder={placeholder}
            />
        </div>
    )
}
export default InputTextarea
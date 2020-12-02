import React, {FC} from "react";
import Select, {ValueType} from "react-select";
import styles from "./style.module.scss"

export interface optionType {
    value: string,
    label:string;
}

interface Iprops {
    options:optionType[]
    value: undefined | ValueType<optionType>
    isMulti?:boolean
    onChange:(e:ValueType<optionType>) => void
    classInput?:string,
    classWrap?:string,
    labelName?:string,
    id:string,
    placeholder?:string
}

const InputSelect:FC<Iprops> = (props) =>{

    const {options,value,isMulti,onChange,classInput,classWrap="",labelName,id,placeholder} = props;

    return (<div className={`${styles[`input__wrap`]} ${classWrap}`}>
        {labelName &&
        <label
            htmlFor={id}
            className={`${styles[`input__label`]} ${styles[`input__label--normal`]}`}
        >
            {labelName}
        </label>
        }
        <Select
            options={options}
            inputId={id}
            value={value}
            isMulti={isMulti}
            onChange={onChange}
            placeholder={placeholder}
            isSearchable={true}
            noOptionsMessage={() => "None"}
            className={` ${classInput}`}
        />
    </div>)
}

export default InputSelect
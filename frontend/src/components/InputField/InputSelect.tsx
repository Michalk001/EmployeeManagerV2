import React, {FC} from "react";
import Select, {ValueType} from "react-select";

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
    id:string
}

const InputSelect:FC<Iprops> = (props) =>{

    const {options,value,isMulti,onChange,classInput,classWrap,labelName,id} = props;

    return (<div className={`input__wrap ${classWrap}`}>
        {labelName &&
        <label
            htmlFor={id}
            className={`input__label input__label--normal`}
        >
            {labelName}
        </label>
        }
        <Select
            options={options}
            value={value}
            isMulti={isMulti}
            onChange={onChange}
            placeholder={"Lista Pracowników"}
            isSearchable={true}
            noOptionsMessage={() => "Brak"}
            className={` ${classInput}`}
        />
    </div>)
}

export default InputSelect
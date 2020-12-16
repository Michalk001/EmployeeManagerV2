import React, {FC} from "react";
import {typeButtonAction,typeButton} from "./index";

import styles from './style.module.scss'

interface IProps {
    label: string,
    typeAction: typeButtonAction,
    typeButton: typeButton,
    onClick?: (e:  React.MouseEvent<HTMLButtonElement>) => void,
    classButton?: string,
    classWrap?: string,
    id?: string
}

const getClassByType = (type:typeButton) =>{
    if(type === typeButton.remove)
        return `${styles[`button--remove`]}`
    if(type === typeButton.update)
        return `${styles[`button--update`]}`
    return ''
}

const Button:FC<IProps> = (props) =>{

    const {id,label,typeAction,typeButton,onClick,classButton="",classWrap=""} = props;
    return(
        <div className={`${classWrap}`}>
            <button
                id={id}
                type={typeAction}
                onClick={onClick}
                className={`${styles[`button`]} ${classButton}  ${getClassByType(typeButton)}`}
            >
                {label}
            </button>
        </div>
    )
}

export default Button
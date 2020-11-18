import React, {FC} from "react";
import {typeButtonAction,typeButton} from "./index";

import './style.scss'

interface IProps {
    label: string,
    typeAction: typeButtonAction,
    typeButton: typeButton,
    onClick?: (e:  React.MouseEvent<HTMLButtonElement>) => void,
    classButton?: string,
    classWrap?: string
}

const getClassByType = (type:typeButton) =>{
    if(type === typeButton.remove)
        return `button--remove`
    if(type === typeButton.update)
        return 'button--update'
    return ''
}

const Button:FC<IProps> = (props) =>{

    const {label,typeAction,typeButton,onClick,classButton="",classWrap=""} = props;
    return(
        <div className={`${classWrap}`}>
            <button
                type={typeAction}
                onClick={onClick}
                className={`button ${classButton}  ${getClassByType(typeButton)}`}
            >
                {label}
            </button>
        </div>
    )
}

export default Button
import React, {FC} from "react"

import styles from "./style.module.scss"
import {Link} from "react-router-dom";
export interface IOptionLabel {
    onClick: () => void;
    typeOption:typeOption;
}

export enum typeOption   {
    remove,
    delete,
    undo
}
interface IProps {
    value:string,
    path:string,
    optionLabel?:IOptionLabel[]
}
/*
const optionLabel:FC<{option:IOptionLabel}> = ({option}) =>{

    const getIco = (type:typeOption) =>{

        if(type === typeOption.remove){
            return  <i className="fas fa-ban"/>
        }
        if(type === typeOption.delete){
            return <i className="fas fa-trash"/>
        }
        if(type === typeOption.undo){
            return  <i className="fas fa-undo-alt"/>
        }
    }

    return(
        <div onClick={option.onClick}>

        </div>
    )
}*/

export const ProfileRedirect:FC<IProps> = ({value,path,optionLabel}) =>{

    return (
        <div className={styles.wrap}>
            <Link className={styles.link} to={path} >
                {value}
            </Link>
        </div>
    )

}

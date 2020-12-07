import React, {FC} from "react";

import styles from "./style.module.scss"
import {Link} from "react-router-dom";

interface IProps {
    value: string
    isActive: boolean
    path: string,
    id: string,
    onClickRemove: (id: string) => void,
    onClickRestore: (id: string) => void,
    onClickDelete: (id: string) => void

}



export const ProfileBoxAction:FC<IProps> = (props) =>{
    const {value,path,isActive,id,onClickDelete,onClickRemove,onClickRestore} = props
    return(
        <div className={styles.wrap}>
            <Link className={styles.link} to={path}>
                {value}
            </Link>
            {isActive &&
                <div className={styles.remove} onClick={() => onClickRemove(id)}>
                    <i className="fas fa-ban "/>
                </div>
            }
            {!isActive && <>
                <div className={styles.restore} onClick={() => onClickRestore(id)}>
                    <i className="fas fa-undo-alt"/>
                </div>
                <div className={styles.remove} onClick={() => onClickDelete(id)}>
                    <i className="fas fa-trash"/>
                </div>
            </>}
        </div>
    )
}
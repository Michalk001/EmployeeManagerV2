import React, {FC} from "react"

import styles from "./style.module.scss"
import {Link} from "react-router-dom";

interface IProps {
    value:string,
    path:string,

}

export const ProfileRedirect:FC<IProps> = ({value,path}) =>{

    return (
        <div className={styles.wrap}>
            <Link className={styles.link} to={path} >
                {value}
            </Link>
        </div>
    )

}

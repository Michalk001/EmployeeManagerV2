import React, {FC} from "react";
import styles from "./style.module.scss"

export const ListMessage:FC<{value:string}> = ({value}) =>{
        return(
            <div className={`${styles[`list__message`]}`}>{value}</div>
        )
}


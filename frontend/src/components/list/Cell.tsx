import React, {FC} from "react";

import styles from "./style.module.scss"

interface IProps {
    value:string|number
}



export const CellWide:FC<IProps> = ({value}) =>{
    return <div className={`${styles["list__cell"]} ${styles["list__cell--wide"]}`}>{value}</div>
}

export const CellNormal:FC<IProps>  = ({value}) =>{
    return <div className={`${styles["list__cell"]} ${styles["list__cell--normal"]}`}>{value}</div>
}

export const CellSmall:FC<IProps>  = ({value}) =>{
    return <div className={`${styles["list__cell"]} ${styles["list__cell--small"]}`}>{value}</div>
}
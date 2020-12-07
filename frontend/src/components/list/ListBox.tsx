import React, {FC, ReactNode} from "react";
import "./style.module.scss"

import styles from "./style.module.scss"

interface props {
    children:ReactNode
}

export const ListBox:FC<props> =({children})=>{
    return<div className={`${styles[`list`]}`}>
        {children}
    </div>
}
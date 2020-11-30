import React, {FC, ReactNode} from "react";

import styles from "./style.module.scss"

interface props {
    children:ReactNode
}

export const BoxWide:FC<props> = ({children}) =>{
    return(
        <div className={styles.wide}>
            {children}
        </div>
    )
}


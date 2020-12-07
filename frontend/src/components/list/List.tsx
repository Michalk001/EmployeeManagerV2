import React, {FC} from "react"
import {ProfileRedirect} from "../common";
import {IProjectList} from "../user/common";

import styles from "./style.module.scss"

export const List:FC<IProjectList> = ({ items,label}) =>{
    return(
        <div className={styles.wrap}>
            <div className={styles.title}>
                {label}
                {items.length === 0 &&
                <span className={styles.empty}> Brak </span>
                }
            </div>
            <div className={styles.row}>
                {items.map(item =>(
                    <ProfileRedirect
                        key={item.id}
                        path={`${item.path}/${item.id}`}
                        value={item.label}
                    />
                ))}

            </div>
        </div>
    )
}
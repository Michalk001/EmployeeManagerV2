import React, {FC} from "react";

import styles from "./style.module.scss"
import {IProfileAction} from "../admin/common/types";
import {ProfileBoxAction} from "../admin/common/ProfileBoxAction";
import {useTranslation} from "react-i18next";

interface IProps {
    items: IProfileAction[]
    label: string
}

export const ProfileActionList:FC<IProps> = ({ items,label}) =>{
    const {t} = useTranslation('common');
    return(
        <div className={styles.wrap}>
            <div className={styles.title}>
                {label}
                {items.length === 0 &&
                <div className={styles.empty}> {t('common.lack')} </div>
                }
            </div>
            <div className={styles.row}>
                {items.map(item =>(
                    <ProfileBoxAction
                        key={item.id}
                        value={item.value}
                        isActive={item.isActive}
                        id={item.id}
                        onClickDelete={item.onClickDelete}
                        onClickRemove={item.onClickRemove}
                        onClickRestore={item.onClickRestore}
                        path={`${item.path}/${item.id}`}
                    />
                ))}

            </div>
        </div>
    )
}
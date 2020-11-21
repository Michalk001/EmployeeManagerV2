import React, {ChangeEvent, FC} from "react";
import styles from "./style.module.scss"


export const AdminSelect:FC<{selectType:boolean, updateAdmin:(isAdmin:boolean) => void}> = ({selectType,updateAdmin}) =>{

    const updateIsAdmin= (e:ChangeEvent<HTMLInputElement>) =>{
        if(e.target.value === "true")
            updateAdmin(true)
        else
            updateAdmin(false)
    }

    return( <div className={`${styles["admin-select__wrap"]}`}>
        <label  className={`${styles["admin-select__radio-button--title"]} `}>Admin</label>
        <div className={`${styles["admin-select__radio-button--wrap"]}`}>
            <label className={`${styles["admin-select__radio-button"]} ${selectType ? `${styles["admin-select__radio-button--active"]}`: ``}  `}
                   htmlFor={`isAdminTrue`}
            >
                YES
            </label>
            <input
                className={`${styles["admin-select__input"]}`}
                id="isAdminTrue"
                name="isAdmin" value={"true"}
                type="radio"
                onChange={updateIsAdmin}

            />
            <label className={`${styles["admin-select__radio-button"]}  ${!selectType ? `${styles["admin-select__radio-button--active"]}  `: ``} `}
                   htmlFor={`isAdminFalse`}
            >
                NO
            </label>
            <input
                className={`${styles["admin-select__input"]}`}
                id="isAdminFalse"
                name="isAdmin" value={"false"}
                type="radio"
                onChange={updateIsAdmin}
            />

        </div>
    </div>)
}
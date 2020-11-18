import React, {ChangeEvent, FC} from "react";

export const AdminSelect:FC<{selectType:boolean, updateAdmin:(isAdmin:boolean) => void}> = ({selectType,updateAdmin}) =>{

    const updateIsAdmin= (e:ChangeEvent<HTMLInputElement>) =>{
        if(e.target.value === "true")
            updateAdmin(true)
        else
            updateAdmin(false)
    }

    return( <div className={`admin-user__field-wrap admin-user__field-wrap--select-admin`}>
        <label  className={`admin-user__radio-button--title`}>Admin</label>
        <div className={`admin-user__radio-button--wrap`}>
            <label className={`admin-user__radio-button ${selectType ? `admin-user__radio-button--active`: ``}  `}
                   htmlFor={`isAdminTrue`}
            >
                YES
            </label>
            <input
                className={`admin-user__radio-button--input`}
                id="isAdminTrue"
                name="isAdmin" value={"true"}
                type="radio"
                onChange={updateIsAdmin}

            />
            <label className={`admin-user__radio-button  ${!selectType ? `admin-user__radio-button--active`: ``} `}
                   htmlFor={`isAdminFalse`}
            >
                NO
            </label>
            <input
                className={`admin-user__radio-button--input`}
                id="isAdminFalse"
                name="isAdmin" value={"false"}
                type="radio"
                onChange={updateIsAdmin}
            />

        </div>
    </div>)
}
import React, {FC} from "react"
import {ProfileRedirect} from "../../common";
import {IProjectList} from "./types";



export const List:FC<IProjectList> = ({ optionLabel,items,label}) =>{
    return(
        <>
            <div className={`user-profile__item user-profile__item--top-line user-profile__item--title-list user-profile__text`}>
                {label}
                {items.length === 0 &&
                <span className={` user-profile__text`}> Brak </span>
                }
            </div>
            <div className={`user-profile__row user-profile__row--project-list`}>
                {items.map(item =>(
                    <ProfileRedirect
                        key={item.id}
                        path={`${item.path}/${item.id}`}
                        value={item.label}
                        optionLabel={optionLabel}
                    />
                ))}

            </div>
        </>
    )
}
import React, {ChangeEvent, FC, useCallback, useEffect, useState} from "react"
import {ListRow} from "./Row";
import {Input, TypeInput} from "../InputField";
import {ListBox} from "./ListBox";
import styles from "./style.module.scss"
import {useTranslation} from "react-i18next";

interface IProps<T extends IReqPropsGeneric> {
    originValue:T[],
    setFilterValue: (object:any[]) => void

}

interface IReqPropsGeneric {
    name:string
    isActive:boolean
}

enum filterTypeCheck {
    all="all",
    active="active",
    inactive="inactive"
}

export const Search:FC<IProps<IReqPropsGeneric>> = ({originValue,setFilterValue}) =>{
    const {t} = useTranslation('common');
    const [search, setSearch] = useState({
        searchByName:"",
        status:filterTypeCheck.all
    })


    const updateSearchValue = (e:ChangeEvent<HTMLInputElement>) =>{
        setSearch({...search,[e.target.name]:e.target.value})
    }

    const handleFilter = useCallback( () =>{
            let list = [...originValue]

           if (search.status === filterTypeCheck.inactive)
                list = list.filter(item => {
                    return !item.isActive
                })
            else if (search.status === filterTypeCheck.active)
                list = list.filter(item => {
                    return item.isActive
                })
            list = list.filter(item => item.name.toUpperCase().includes(search.searchByName.toUpperCase()))
        setFilterValue(list)

    },[search,originValue])

    useEffect(() =>{
        handleFilter();
    },[handleFilter])

    return(
        <ListBox>
            <ListRow>
                <div className={`${styles["list__label"]}`}>{t('common.searchByName')}</div>
                <div className={`${styles["list__radio-button--wrap"]}`} >
                    <label className={`${styles["list__radio-button"]} ${filterTypeCheck.all === search.status ? `${styles["list__radio-button--active"]}` :""}`}
                           htmlFor={`filter-all`}>{t('common.all')}</label>
                    <input
                        onChange={updateSearchValue}
                        className={`${styles[`list__radio-button--radio`]}`}
                        id="filter-all"
                        name="status"
                        value={filterTypeCheck.all}
                        type="radio"
                    />
                    <label className={`${styles["list__radio-button"]} ${filterTypeCheck.active === search.status ? `${styles["list__radio-button--active"]}` :""}`}
                           htmlFor={`filter-active`}> {t('common.active')}</label>
                    <input
                        onChange={updateSearchValue}
                        className={`${styles[`list__radio-button--radio`]}`}
                        id="filter-active"
                        name="status"
                        value={filterTypeCheck.active}
                        type="radio"
                    />
                    <label className={`${styles["list__radio-button"]} ${filterTypeCheck.inactive === search.status ? `${styles["list__radio-button--active"]}` :""}`}
                           htmlFor={`filter-inactive`}>{t('common.inactive')}</label>
                    <input onChange={updateSearchValue}
                        className={`${styles[`list__radio-button--radio`]}`}
                        id="filter-inactive"
                        name="status"
                        value={filterTypeCheck.inactive}
                        type="radio"
                    />

                </div>
            </ListRow>
            <Input
                value={search.searchByName}
                onChange={updateSearchValue}
                id={"searchByName"}
                name={"searchByName"}
                type={TypeInput.text}
                placeholder={`${t('common.search')}...`}
            />
        </ListBox>
    )
}
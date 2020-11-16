import React, {ChangeEvent, FC, useEffect, useState} from "react"
import {ListRow} from "./Row";
import {Input, TypeInput} from "../InputField";
import {ListBox} from "./ListBox";


interface IProps<T extends IReqPropsGeneric> {
    originValue:T[],
    setFilterValue: (object:any[]) => void

}

interface IReqPropsGeneric {
    name:string
    status:string
}

enum filterTypeCheck {
    all="all",
    active="active",
    inactive="inactive"
}

export const Search:FC<IProps<IReqPropsGeneric>> = ({originValue,setFilterValue}) =>{

    const [search, setSearch] = useState({
        searchByName:"",
        status:filterTypeCheck.all
    })


    const updateSearchValue = (e:ChangeEvent<HTMLInputElement>) =>{
        setSearch({...search,[e.target.name]:e.target.value})
    }

    const handleFilter = () =>{
            let list = [...originValue]

           if (search.status === filterTypeCheck.inactive)
                list = list.filter(item => {
                    return item.status === filterTypeCheck.inactive
                })
            else if (search.status === filterTypeCheck.active)
                list = list.filter(item => {
                    return item.status === filterTypeCheck.active
                })
            list = list.filter(item => item.name.toUpperCase().includes(search.searchByName.toUpperCase()))
        setFilterValue(list)

    }

    useEffect(() =>{
        handleFilter();
    },[search])

    return(
        <ListBox>
            <ListRow>
                <div className={"list__label"}>Wyszukaj Po nazwie</div>
                <div className="list__radio-button--wrap">
                    <label className={`list__radio-button ${filterTypeCheck.all === search.status ? "list__radio-button--active" :""}`}
                           htmlFor={`filter-all`}>Wszystkie</label>
                    <input
                        onChange={updateSearchValue}
                        className="list__radio-button--radio"
                        id="filter-all"
                        name="status"
                        value={filterTypeCheck.all}
                        type="radio"
                    />
                    <label className={`list__radio-button ${filterTypeCheck.active === search.status ? "list__radio-button--active" :""}`}
                           htmlFor={`filter-active`}>Aktywne</label>
                    <input
                        onChange={updateSearchValue}
                        className="list__radio-button--radio"
                        id="filter-active"
                        name="status"
                        value={filterTypeCheck.active}
                        type="radio"
                    />
                    <label className={`list__radio-button ${filterTypeCheck.inactive === search.status ? "list__radio-button--active" :""}`}
                           htmlFor={`filter-inactive`}>Nieaktywne</label>
                    <input onChange={updateSearchValue}
                        className="list__radio-button--radio"
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
                placeholder={`Wyszukaj...`}
            />
        </ListBox>
    )
}
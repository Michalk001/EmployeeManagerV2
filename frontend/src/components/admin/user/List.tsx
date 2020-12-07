import React, {useEffect, useState} from "react";
import {FetchGet} from "../../../utiles/Fetch";
import config from "../../../utiles/config.json";
import {IUser} from "./duck/types";
import {BoxWide} from "../../box/Wide";
import {ListBox, ListCellNormal, ListCellSmall, ListCellWide, ListFilter, ListMessage, ListTitleRow} from "../../list";
import {LinkRow} from "../../list/Row";
import {AppRoute} from "../../../routing/AppRoute.enum";
import {getStatus} from "../common/getStatus";

 interface IUserList {
     name:string,
     username:string,
     isActive:boolean,
     projects:number
}

export const List = () =>{
    const isMounted = React.useRef(false);
    const [users,setUsers] = useState<IUserList[]>([]);
    const [usersFiltered, setUsersFiltered] = useState<IUserList[]>([]);

    const getUserList = async () =>{
        const res = await FetchGet(`${config.API_URL}/user`);
        const userList:IUser[] = await res.json()
        const usersM:IUserList[] = userList.map(user =>{
            return{
                name: user.firstName + " " + user.lastName,
                isActive: user.isActive,
                username: user.username,
                projects:user.projects
            }
        })
        setUsers(usersM);
        setUsersFiltered(usersM);
    }
    useEffect(() =>{
        isMounted.current = true
        if(isMounted.current) {
            getUserList();
        }
        return () =>{isMounted.current = false}
    },[])

    const updateFilteredValue = (object:IUserList[]) =>{
        setUsersFiltered(object)
    }


    return(
        <BoxWide>

            <ListFilter originValue={users} setFilterValue={updateFilteredValue}/>
            <ListBox>
                <ListTitleRow>
                    <ListCellWide value={`Name`}/>
                    <ListCellNormal value={`Projects`} />
                    <ListCellSmall value={`Status`} />
                </ListTitleRow>
                <ListBox>
                    {usersFiltered.map(user =>(
                        <LinkRow key={user.username} path={`${AppRoute.userProfile}/${user.username}`}>
                            <ListCellWide value={user.name}/>
                            <ListCellNormal value={user.projects} />
                            <ListCellSmall value={getStatus(user.isActive)} />
                        </LinkRow>
                    ))}
                    {usersFiltered.length === 0 &&
                    <ListMessage value={`No Found Employees`} />
                    }
                </ListBox>

            </ListBox>


        </BoxWide>
    )
}
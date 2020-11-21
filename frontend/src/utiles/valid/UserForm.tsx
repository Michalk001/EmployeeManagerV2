import {IUserProfile} from "../../components/user/employee/duck/types";
import {IAlertList} from "../../components/snackbar";
import {ValidEmail, ValidIsEmpty, ValidPassword} from "./index";
import {IUserNew} from "../../components/admin/user/duck/types";
import {IInvalidUserForm, typeValidUserForm} from "./types";



export const UserForm = (user:IUserProfile|IUserNew,typeValidForm:typeValidUserForm) =>{
    let isInvalid = false;
    const alert:IAlertList[] = [];
    const validEmail = ValidEmail(user.email.trim())
    const invalidField:IInvalidUserForm = {
        firstName:false,
        lastName:false,
        email:false
    }

    if(validEmail){
        isInvalid = true;
        invalidField.email = true
        if(validEmail){
            validEmail.forEach(item =>{
                alert.push({text:item.toString()});
            })
        }
    }
    if(ValidIsEmpty(user.firstName)){
        isInvalid = true;
        invalidField.firstName = true
    }
    if(ValidIsEmpty(user.lastName)){
        isInvalid = true;
        invalidField.lastName = true
    }

    if(typeValidForm === typeValidUserForm.NEW_USER) {
        const {username,password} = user as IUserNew
        if (ValidIsEmpty(username)) {
            isInvalid = true;
            invalidField.username = true
        } else {
            invalidField.username = false
        }

        const resValid = ValidPassword(password.trim() , user.username.trim())
        if (resValid) {
            isInvalid = true;
            resValid.forEach(item => {
                alert.push({text: item.toString()})
            })
            invalidField.password = true
        }
        else {
            invalidField.password=false
        }
    }
    return{
        alerts: alert,
        isInvalid,
        invalidField
    }

}
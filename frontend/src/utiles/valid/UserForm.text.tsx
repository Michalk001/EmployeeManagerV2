import {UserForm} from "./UserForm";
import {IUserNew} from "../../components/admin/user/duck/types";
import {typeValidUserForm} from "./types";


jest.mock("../policy.json", () => ({
    PASSWORD: {
        LEAST_LENGTH: 8,
        LEAST_ONE_NUMBER: true,
        DIFFERENT_USERNAME: true,
        LEAST_ONE_UPPERCASE: true,
        LEAST_ONE_LOWERCASE: true
    }
}));


describe("UserForm valid", () =>{


    it("correct new user", () =>{
        const userNew:IUserNew = {
            isAdmin: false,
            password: "Test1234",
            username: "test111",
            lastName: "Adam",
            firstName: "Hunt",
            email: "Adam@adam.pl",
            phoneNumber:"543123765"

        }
        const result = UserForm(userNew,typeValidUserForm.NEW_USER)
        expect(result.isInvalid).toBeFalsy();
    })

    it("all field incorrect", () =>{
        const userNew:IUserNew = {
            isAdmin: false,
            password: "test111",
            username: "",
            lastName: "",
            firstName: "",
            email: "Adam.pl",
            phoneNumber:"543123765"

        }
        const result = UserForm(userNew,typeValidUserForm.NEW_USER)
        expect(result).toEqual(expect.objectContaining({
            firstName:true,
            lastName:true,
            email:true,
            password:true
        }))
    })

})


jest.restoreAllMocks()
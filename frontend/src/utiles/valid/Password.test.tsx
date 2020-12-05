import {Password} from "./Password";
import {PasswordErrorType} from "./types";


describe("Password Valid Test", () =>{

    afterEach(() =>{
        jest.mock('path/to/setting.json', ()=>({
            settings: 'someSetting'
        }), { virtual: true })
    })

    const username = "admin1234"

    it("correct password",() =>{
        const password = "Test12345"
        const res = Password(password,username)
        expect(res).toBeFalsy();
    })
})
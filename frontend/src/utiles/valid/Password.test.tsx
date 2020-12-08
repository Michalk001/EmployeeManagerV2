

import {Password} from "./Password";
import {PasswordErrorType} from "./types";

jest.mock("../policy.json", () => ({
    PASSWORD: {
        LEAST_LENGTH: 8,
        LEAST_ONE_NUMBER: true,
        DIFFERENT_USERNAME: true,
        LEAST_ONE_UPPERCASE: true,
        LEAST_ONE_LOWERCASE: true
    }
}));

describe("Password Valid Test", () =>{


    const username = "admin1234"
    it("correct password",() =>{
        const password = "Test12345"
        const res = Password(password,password,username)
        expect(res).toBeFalsy();
    })
    it("password same username", () =>{
        const res = Password(username,username,username)
        expect(res).toContain(PasswordErrorType.DIFFERENT_USERNAME)
    })
    it("password with without uppercase",() =>{

        const password = "test12345"
        const res = Password(password,password,username)

        expect(res).toContain(PasswordErrorType.LEAST_ONE_UPPERCASE)
    })
    it("password with without lowercase",() =>{
        const password = "TEST12345"
        const res = Password(password,password,username)
        expect(res).toContain(PasswordErrorType.LEAST_ONE_LOWERCASE)
    })
    it("password with without dig",() =>{

        const password = "Testtest"
        const res = Password(password,password,username)
        expect(res).toContain(PasswordErrorType.LEAST_ONE_NUMBER)
    })
    it("password short",() =>{
        const password = "test"
        const res = Password(password,password,username)
        expect(res).toContain(PasswordErrorType.LEAST_LENGTH)
    })

})

jest.restoreAllMocks()

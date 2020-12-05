import {EmailValidType} from "./types";
import {Email} from "./Email";

describe("Email Valid", () =>{
    it("correct email", () =>{
        const email = "test@test.pl"
        const res = Email(email);
        expect(res).toBeNull();
    })
    it("incorrect email without domain", () =>{
        const email = "test@test"
        const res = Email(email);
        expect(res).toBe(EmailValidType.INVALID_EMAIL);
    })

    it("incorrect email without At sing", () =>{
        const email = "test.pl"
        const res = Email(email);
        expect(res).toBe(EmailValidType.INVALID_EMAIL);
    })
})
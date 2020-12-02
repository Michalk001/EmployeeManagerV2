import React from "react";
import { shallow,mount  } from 'enzyme';
import {Login} from "./Login"
import {mockFetch} from "../../___mocks___/mockFetch";
import {act} from "@testing-library/react";
describe('Test Login Component',() =>{


    it("Render Form", () =>{
        const wrapper = shallow(<Login />)
        const result = wrapper.exists("#login-form")
        expect(result).toBeTruthy();
    })

   /* it("Form invalid", () =>{
        jest.resetAllMocks()
        mockFetch(200);
        const wrapper = mount(<Login />)
        act( () => {
            const username = wrapper.find(`input[id="username"]`).first();
            username.simulate('change', {target: {name: 'username', value: 'test'}});
            const password = wrapper.find(`input[id="password"]`).first();
            password.simulate('change', {target: {name: 'password', value: 'test1234'}});
            const form = wrapper.find("#login-form").first();
            form.simulate("submit")

        })
        const a = wrapper.find(".MuiSnackbar-root")
        console.log(a.instance())
        expect(wrapper.find("Wrong log1in or password11")).toBeTruthy();
    })*/

})
import React from "react";
import {mount, shallow} from 'enzyme';
import Button from "./Button"

import {typeButton, typeButtonAction} from "./index";

describe('Test Button Component',() =>{

    const testData = {
        label: "test",
        typeAction: typeButtonAction.button,
        typeButton: typeButton.normal,
    }


    it("Button Normal with Value", () =>{
        const wrapper = shallow(<Button {...testData} />)
        const result = wrapper.find(".button").first()
        expect(result.text()).toBe(testData.label)
    })
    it("Button Update  with Value",() =>{
        const wrapper = shallow(<Button {...testData} typeButton={typeButton.update} />)
        const result = wrapper.find(".button--update").first()
        expect(result.text()).toBe(testData.label)
    })
    it("Button Remove  with Value",() =>{
        const wrapper = shallow(<Button {...testData} typeButton={typeButton.remove} />)
        const result = wrapper.find(".button--remove").first()
        expect(result.text()).toBe(testData.label)
    })
    it("Button Click", () =>{
        const mockFn = jest.fn();
        const wrapper = shallow(<Button {...testData} onClick={mockFn} />)
        const button = wrapper.find(".button").first()
        button.simulate('click');
        expect(mockFn).toHaveBeenCalled();
    })

})
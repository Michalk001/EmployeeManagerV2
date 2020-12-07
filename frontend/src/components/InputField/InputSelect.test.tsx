import React from "react";
import {mount} from 'enzyme';
import InputSelect from "./InputSelect";


describe("Test Input Select", ()=>{


    it("Render", ()=>{
        const mockFn = jest.fn();
        const id = `SelectTest`;
        const wrapper = mount(<InputSelect options={[]} value={undefined} onChange={mockFn} id={id} />)
        const result = wrapper.find(`input[id="${id}"]`).first();
        expect(result.props().id).toBe(id)
    })

})
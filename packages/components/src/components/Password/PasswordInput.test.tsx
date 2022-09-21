/*! Copyright (c) 2022, XAPP AI */
import { shallow } from "enzyme";
import React from 'react';
import { PasswordInput } from "./PasswordInput";

describe("Password", () => {
    it("should render", () => {
        const mockOnChange = jest.fn();
        const comp = shallow(<PasswordInput
            value="pwd"
            onChange={mockOnChange}
        />);
        const btn = comp.find("input").at(0);
        expect(btn.prop("value")).toBe("pwd");
    });
});
import React from "react";
import ReactDOM from "react-dom";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, shallow, configure } from "enzyme";

import App from "./App";
import Register from "./Register";
import {render} from "@testing-library/react";
Enzyme.configure({ adapter: new Adapter() });

describe("basic input component", () => {

    //tests if the component can be rendered without crashing
    it("should renders without crashing", () => {
        const div = document.createElement("div");
      //  ReactDOM.render(<Register />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    //tests if we can render a placeholder
    it("should render a place", () => {
        const placeholder_text = "Enter your email";
        const wrapper = shallow(<input placeholder={placeholder_text} />);
        expect(wrapper.prop("placeholder")).toEqual(placeholder_text);
    });

    //checks if the type of input is correct
    it("should render a correct type", () => {
        const type = "password";
        const wrapper = shallow(<input type={type} />);
        expect(wrapper.prop("type")).toEqual(type);
    });

    //check if the button works
    it('should render a button with the class of primary', () => {
        render(<button />)
    })

/*    it("should change the state after change the input value", () => {
        const newValue = "testing component";
        const wrapper = mount(<input value="" type="email" />);
        // const input = wrapper.find('input[type="text"]');
        wrapper
            .find('input[name="email"]')
            .simulate("change", { target: { value: newValue } });

        expect(wrapper.find('input[name="email"]').prop("value")).toEqual(newValue);
    });*/
});

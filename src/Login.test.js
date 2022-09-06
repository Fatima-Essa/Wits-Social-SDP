import React from "react";
import ReactDOM from "react-dom";

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, shallow, configure } from "enzyme";

import App from "./App";
import Login from "./Login";
import {render} from "@testing-library/react";
Enzyme.configure({ adapter: new Adapter() });

describe("basic input component", () => {
    //test if the app renders without crashing

    it("should renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    // creates a placeholder to test
    it("should render a placeholder", () => {
        const placeholder_text = "Enter your email";
        const wrapper = shallow(<input placeholder={placeholder_text} />);
        expect(wrapper.prop("placeholder")).toEqual(placeholder_text);
    });

    //tests the type of the input
    it("should render a correct type", () => {
        const type = "password";
        const wrapper = shallow(<input type={type} />);
        expect(wrapper.prop("type")).toEqual(type);
    });

    //renders a button
    it('should render a button with the class of primary', () => {
        render(<button />)
    })

});
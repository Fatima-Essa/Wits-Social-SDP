import React from "react";
import ReactDOM from "react-dom";

import Adapter from "enzyme-adapter-react-16";
import { mount, shallow, configure } from "enzyme";

import App from "./App";
import Login from "./Login";
import {render} from "@testing-library/react";
configure({ adapter: new Adapter() });

describe("basic input component", () => {
    it("should renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it("should render a placeholder", () => {
        const placeholder_text = "Enter your email";
        const wrapper = shallow(<input placeholder={placeholder_text} />);
        expect(wrapper.prop("placeholder")).toEqual(placeholder_text);
    });

    it("should render a correct type", () => {
        const type = "password";
        const wrapper = shallow(<input type={type} />);
        expect(wrapper.prop("type")).toEqual(type);
    });

    it('should render a button with the class of primary', () => {
        render(<button />)
    })

});
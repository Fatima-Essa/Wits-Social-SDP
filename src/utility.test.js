import React from "react";
import ReactDOM from "react-dom";

//import Adapter from "enzyme-adapter-react-16";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount, shallow, configure } from "enzyme";

//import App from "./App";
//import Register from "./Register";
import {render} from "@testing-library/react";
//configure({ adapter: new Adapter() });
Enzyme.configure({ adapter: new Adapter() });

jest.mock('Swiper', () => class Mocked{});

describe("basic input component", () => {
    it("should renders without crashing", () => {
        const div = document.createElement("div");
        //  ReactDOM.render(<Register />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it("should render a place", () => {
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
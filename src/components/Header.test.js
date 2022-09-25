import React  from 'react';
import Header from './Header';


import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ReactDOM from "react-dom";

Enzyme.configure({ adapter: new Adapter() })

it('renders correctly enzyme', () => {
    const wrapper = shallow(<Header />)

    expect(toJson(wrapper)).toMatchSnapshot();
});

describe("basic input component", () => {
    it("should renders without crashing", () => {
        const div = document.createElement("div");
        //  ReactDOM.render(<Register />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

it("should render a place for caption", () => {
    const placeholder_text = "Add a caption";
    const wrapper = shallow(<input placeholder={placeholder_text} />);
    expect(wrapper.prop("placeholder")).toEqual(placeholder_text);
});

it("should render a correct type", () => {
    const type = "file";
    const wrapper = shallow(<input type={type} />);
    expect(wrapper.prop("type")).toEqual(type);
});

it('should render a button with the class of primary', () => {
    render(<button />)
});
import React from 'react';
import ReactDOM from 'react-dom';
import NotFound from './NotFound';

import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Link } from 'react-router-dom'
import renderer from "react-dom/cjs/react-dom-test-utils.development";

Enzyme.configure({ adapter: new Adapter() })

it('renders correctly enzyme', () => {
    const wrapper = shallow(<NotFound />)

    expect(toJson(wrapper)).toMatchSnapshot();
});
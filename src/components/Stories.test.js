import React  from 'react';
import Stories from './Stories';


import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() })

it('renders correctly enzyme', () => {
    const wrapper = shallow(<Stories />)

    expect(toJson(wrapper)).toMatchSnapshot();
});
import renderer from 'react-test-renderer'
import React from 'react'
import { shallow } from 'enzyme'
import button from '../components/Header'

describe('<button />', () => {
    it('Should render correctly', () => {
        const component = renderer.create(<button />)
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })


})
import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />',()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<BurgerBuilder onInitIngredient={()=>{}}/>)
    });

    it('should render build controls',()=>{
        wrapper.setProps({ings: {salad:0}})
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    })
});

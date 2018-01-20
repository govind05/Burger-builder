import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />',()=>{
    let wrapper;
    beforeEach(() => {
        wrapper= shallow(<NavigationItems />)
    })
    it('should render two <NavigationItem /> if not authenticated',()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> if authenticated',()=>{
        wrapper.setProps({
            isAuthenticated: true
        });
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should exact logout',()=>{
        wrapper.setProps({
            isAuthenticated: true
        });
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true);
    })
})
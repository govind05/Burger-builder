import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggler from '../SideDrawer/SideDrawerToggler/SideDrawerToggler';

const toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <SideDrawerToggler click={props.sideDrawerClick}/>        
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth}/>
        </nav>
    </header>
);

export default toolbar;
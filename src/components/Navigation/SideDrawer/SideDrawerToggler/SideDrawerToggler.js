import React from 'react';

import classes from './SideDrawerToggler.css';

const sideDrawerToggler = (props) =>(
    <div className={classes.SideDrawerToggler} onClick={props.click}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default sideDrawerToggler;
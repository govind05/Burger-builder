import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Auxi';
import BackDrop from '../../UI/Backdrop/Backdrop';


const sideDrawer = (props) => {
    let attachedClasses=[classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses=[classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <BackDrop  show={props.open} clicked={props.clicked}/>
            <div className={attachedClasses.join(' ')} onClick={props.clicked}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}/>
                </nav>
            </div>       
        </Aux>
    )
}

export default sideDrawer;
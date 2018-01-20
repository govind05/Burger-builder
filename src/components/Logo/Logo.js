import React from 'react';
import Imagelogo from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const logo = () => (
    <div  className = {classes.Logo}>
        <img src = {Imagelogo} alt="myBurger"/>
    </div>

);

export default logo;
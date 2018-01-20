import React from 'react';
import classes from './Input.css';

const input = (props) =>{
    let inputElement = null;
    let inputClass=[classes.InputElement]

    if(props.invalid && props.shouldValidate && props.touched){
        inputClass.push(classes.Invalid);
    }
    switch(props.elementType){
        case 'input' : 
            inputElement = <input className={inputClass.join(' ')} {...props.elementConfig}  value={props.value}  onChange={props.changed}/>
            break;
            
        case 'textarea' : 
            inputElement = <textarea className={inputClass.join(' ')} {...props.elementConfig} value={props.value}  onChange={props.changed}/>
            break;

        case 'select' : 
            inputElement = ( 
                <select className={inputClass.join(' ')} value={props.value} onChange={props.changed} >
                    {props.elementConfig.options.map(option =>(
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}                
                </select>);
            break;
        
        default : 
            inputElement = <input className={inputClass.join(' ')} {...props.elementConfig} value={props.value}  onChange={props.changed}/>
            break;

    }
    let validationError = null;
    if (props.invalid && props.touched && props.shouldValidate) {
        validationError = <p className={classes.ValidationError}>Please enter a valid {props.name}!</p>;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    );
}

export default input;
import React,{ Component } from "react";
import {connect} from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component{
    state={
        orderForms:{ 
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            pincode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'PinCode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            } ,
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            } ,
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'},
                    ],
                },
                value:'fastest',
                validation:{},
                valid:true
            } ,
        },
        formIsValid: false,
        
    }

    orderHandler = (event) => {
        event.preventDefault();
        
        const formData={};
        for(let formElementID in this.state.orderForms){
            formData[formElementID]= this.state.orderForms[formElementID].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price.toFixed(2),
            orderData: formData,
            userId: this.props.userId
        };
        this.props.onOrderBurger(order, this.props.token);
         
    }

    inputChangedHandler = (event, elementID) =>{
        
        const updatedFormElement = updateObject(this.state.orderForms[elementID],{
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForms[elementID].validation),
            touched:true
        })
        const updatedOrderForm = updateObject(this.state.orderForms,{
            [elementID]: updatedFormElement
        })
        let formIsValid=true;
        for(let formElementID in updatedOrderForm){
            formIsValid = updatedOrderForm[formElementID].valid && formIsValid;
        }
        updatedOrderForm[elementID]=updatedFormElement;
        this.setState({orderForms:updatedOrderForm,formIsValid: formIsValid});
    }

   
    
    render(){
        const formElementArray =[];
        for (let key in this.state.orderForms){
            formElementArray.push({
                id:key,
                config:this.state.orderForms[key],
            })
        }
        let form = (
        <form onSubmit={this.orderHandler}>
           
            {formElementArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    name={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event)=> this.inputChangedHandler(event, formElement.id)}/>
            ))}
            <Button btnType='Success' disabled = {!this.state.formIsValid}>ORDER</Button>
        </form>);
        if(this.props.loading){
            form=<Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Detail</h4>
                {form}
            </div>
        );
    }
}

const mapStatetoProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchtoProps = dispatch => {
    return{
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(ContactData, axios));
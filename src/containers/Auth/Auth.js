import React , {Component} from 'react';
import {connect } from 'react-redux';
import { Redirect } from 'react-router';

import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state={
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
        },
        isSignUp: true
    }
    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirect !== '/'){
            this.props.onSetAuthRedirectPath()
        }
    }

    inputChangedHandler = (event , controlName) => {
        const updatedControls = updateObject(this.state.controls,{
                [controlName]: updateObject(this.state.controls[controlName],{
                                value:event.target.value,
                                valid: checkValidity(event.target.value,this.state.controls[controlName].validation),
                                touched: true
            })
        })
        this.setState({controls: updatedControls})
    }
    switchAuthModeHandler = () => {
        this.setState(prevState =>{
            return{isSignUp: !prevState.isSignUp}
        });
        //console.log(this.state.isSignUp)
    }
    submitHandler = (event) =>{
        event.preventDefault();
        //console.log(this.state.isSignUp);
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp)
    }

    render(){
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key],
            })
        }
        let form = (
            formElementArray.map(formElement => (
                <Input
                    key={formElement.id}
                    name={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ))
        );

        if(this.props.loading){
            form = <Spinner />
        }
        let errorMessage = null;
        if(this.props.error){
            errorMessage = <p>{this.props.error.message}</p>
        }
        let authRedirect= null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                btnType="Danger"
                clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignUp ? 'SIGNIN': 'SIGNUP'}</Button>
            </div>
        )
    }
}
const mapStatetoProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
        isAuthenticated: state.auth.token !== null
    }
}
const mapDispatchtoProps = dispatch =>{
    return{
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Auth);
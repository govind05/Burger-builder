import React,{ Component } from "react";
import { Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';

class Checkout extends Component{
    state = {
        ingredients:null,
        totalPrice:0
    }
    componentWillMount = () => {
        /*const updatedIngredients = {
            bacon: +this.props.match.params.bacon,
            cheese: +this.props.match.params.cheese,
            meat: +this.props.match.params.meat,
            salad: +this.props.match.params.salad,
        };
        if (updatedIngredients !== this.state.ingredients) {
            this.setState({ ingredients: updatedIngredients });

        }*/
        // const query = new URLSearchParams(this.props.location.search);
        // let ingredients={};
        // let price=0;
        // for(let param of query.entries()){
        //     if(param[0]=== 'price'){
        //         price = +param[1];
        //     }
        //     else { 
        //         ingredients[param[0]] = +param[1];
        //     }
           
        // }
        
        // this.setState({ingredients:ingredients, totalPrice: price})
        this.props.onInitPurchase();
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
   
    render(){
        let summary = <Redirect to='/'/>
        if(this.props.ings){
            const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null;
            summary=(
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutContinued={this.checkoutContinuedHandler}
                        checkoutCancelled={this.checkoutCancelledHandler} />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>
            );
        }
        return summary;
    }
}

const mapStatetoProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}
const mapDispatchtoProps = dispatch => {
    return{
        onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(Checkout);
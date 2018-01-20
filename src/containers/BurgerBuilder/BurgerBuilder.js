import React,{Component} from 'react';
import {connect} from 'react-redux';

import Aux from "../../hoc/Auxi";
import Burger from '../../components/Burger/Burger';
import BurgerControls from  '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';


export class BurgerBuilder extends Component{
    state ={
        purchasing: false,
    }

    updatePurchasable(ingredients){
        const sum = Object.keys(ingredients)
            .map((Igkey) => {
                return ingredients[Igkey];
            })
            .reduce((total,el) => {
                return total = total+el;
            },0)
        // console.log(sum);
        return  sum > 0;
    }

    // ingredientsAddHandler = ( type ) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const oldPrice = this.state.totalPrice;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const updatedPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice: updatedPrice, ingredients:updatedIngredients});
    //     this.updatePurchasable(updatedIngredients);
    // };

    // ingredientsRemoveHandler = ( type ) => {
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const oldPrice = this.state.totalPrice;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const updatedPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice: updatedPrice, ingredients:updatedIngredients});
    //     this.updatePurchasable(updatedIngredients);
    // };

    purchaseHandler = () => {
        if(this.props.isAuthenticated){
            this.setState({ purchasing: true })
        }
        else{
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    }
    purchaseCancelHandler = () => {
        this.setState({purchasing:false})
    }

    purchaseContinueHandler = () =>{
        //alert('You Continued');
       
        
       // this.props.history.push('/checkout/' + this.state.ingredients.bacon + '/' + this.state.ingredients.cheese + '/' + this.state.ingredients.meat + '/' +this.state.ingredients.salad);
    //    let params = [];
    //    for(let i in this.state.ingredients){
    //        params.push(encodeURI(i) +'='+ encodeURI(this.state.ingredients[i]));
    //    }     
    //    const price = this.state.totalPrice;
    //    params.push('price='+encodeURI(price));
    //    const queryParams = params.join('&');
        this.props.onInitPurchase();
       this.props.history.push('/checkout');
    }
    componentDidMount(){
        this.props.onInitIngredient();
    }
    render(){
        const disabledinfo = {
            ...this.props.ings
        }
        for(let key in disabledinfo){
            disabledinfo[key] = disabledinfo[key] <= 0;
        }
        let burger = this.props.error ? <p style={{textAlign:'center'}} >Ingredients can't be fetched</p> :<Spinner />;
        let orderSummary = null;

        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BurgerControls
                        isAuth={this.props.isAuthenticated}
                        ingredientsAdded={this.props.onIngredientAdded}
                        ingredientsRemoved={this.props.onIngredientRemoved}
                        disabled={disabledinfo}
                        price={this.props.price}
                        purchasable={this.updatePurchasable(this.props.ings)}
                        ordered={this.purchaseHandler} />
                </Aux>
            );
            orderSummary = <OrderSummary
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings}
                price={this.props.price} />;
        }

        

        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                    {orderSummary}
                </Modal >
                {burger}
                    
            </Aux>
        );
    }
}

const mapStatetoProps = state =>{
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchtoProps = dispatch =>{
    return{
        onIngredientAdded: (ingName)=>dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredient: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
        }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(BurgerBuilder, axios));
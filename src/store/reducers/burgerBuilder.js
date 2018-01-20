import * as actionType from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.4,
    bacon: 1
};
const addIngredient = (state, action) =>{
    const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    return updateObject(state, { ingredients: updatedIngredients, 
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true
    });
}
const removeIngredient = (state, action) =>{
    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
    return updateObject(state, {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true
    });
}

const setIngredients = (state, action) =>{
    return updateObject(state, {
        ingredients: {
            salad: action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat: action.ingredients.meat
        },
        error: false,
        totalPrice: 4,
        building: false});
}
const fetchIngredientFailed = (state, action) =>{
    return updateObject(state, { error: true} );
}
const reducer = (state = initialState, action) =>{
    switch(action.type){
        case actionType.ADD_INGREDIENT: return addIngredient(state, action);
        case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action);
        case actionType.SET_INGREDIENTS: return setIngredients(state, action);
        case actionType.FETCH_INGREDIENT_FAILED: return fetchIngredientFailed(state, action);
        default: return state;
    }
    
}
export default reducer;
import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const transformedOrders = [];
    for(let igname in props.ingredients){
        transformedOrders.push({
            name:igname,
            amount:props.ingredients[igname]
        });
    }

    const ingredientOutput = transformedOrders.map(ig =>(
        <span style={{
            textTransform:'capitalize',
            display:'inline-block',
            margin:'0 8px',
            border:'1px solid #ccc',
            padding:'5px'
        }} key={ig.name}>
            {ig.name} ({ig.amount})
        </span>   
    ))
    return(
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong> $ {props.price}</strong></p>
            <button  onClick= {props.view} >View Order</button>
            <button onClick = {props.cancel}>Cancel Order</button>
        </div>
    );
}
export default order;
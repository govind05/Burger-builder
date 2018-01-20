import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Auxi';
import Modal from "../../components/UI/Modal/Modal";

class Orders extends Component{
    state={
        orders: [],
        loading: false,
        cancelling: false,
        viewing: false,
        orderId: null
    }
    
    componentDidMount(){
        this.props.onFetchOrder(this.props.token, this.props.userId);
        // console.log(this.props)
    }
    
    
    orderCancelHandler=(token, orderId) =>{
        this.setState({ orderId: orderId, cancelling: true });
    }
    orderCancelClose =()=>{
        this.setState({cancelling: false})
    }
    orderCancelConfirm = () => {
        this.props.onCancelOrder(this.props.token, this.state.orderId);
        this.orderCancelClose();
    }

    orderViewHandler= (token, orderId)=>{
        
        this.setState({ orderId: orderId, viewing: true });
    }

    orderViewClose = () => {
        this.setState({viewing: false});
    }

    render(){
        let order = (this.props.orders.map(order => 
            (<Order 
                key={order.id} 
                ingredients={order.ingredients}
                price={order.price} 
                view = {()=> this.orderViewHandler(this.props.token, order.id)}
                cancel={() =>this.orderCancelHandler(this.props.token, order.id)} />)) );
        if(this.props.loading ){
            order=<Spinner/>
        }
        if(order.length === 0){
            order=<h3 style={{textAlign:'center'}} >Nothing to Display. <br/> Click <Link to='/'>here</Link> to place order</h3>
        }
        const cancel = (
            <div>
                <h3>Are you sure you want to cancel this order?</h3>
                <Button btnType='Danger' clicked={this.orderCancelConfirm}>Yes</Button>
                <Button btnType='Success' clicked={this.orderCancelClose} >No</Button>
            </div>
        );
        let view= null;
        const orderData = this.props.orders.filter(el => el.id === this.state.orderId);
        if(orderData.length !== 0) {
            let customerInfo=[];
            let customer= null;
            view = (
                <div>
                    {orderData.map(order =>{
                        for (let i in order.orderData) {
                            customerInfo.push({ 
                                name: i,
                                value: order.orderData[i]
                            } );
                        }
                        customer = customerInfo.map(el => (
                            <span style={{
                                textTransform: 'capitalize',
                                display: 'block',
                                margin: '0 8px'
                            }} key={el.name} >{el.name}: <strong>{el.value}</strong></span>)
                        )
                        return(
                            <Aux key={order.id}>
                                <div style={{
                                    border: '1px solid #ccc',
                                    padding: '10px',
                                    margin: '10px', 
                                    textAlign: 'center',
                                    boxSizing: 'border-box'
                                }}>
                                    <h3 >Ingredients:</h3>
                                    <p>Salad:<strong>{order.ingredients.salad}</strong>,
                                    Bacon:<strong>{order.ingredients.bacon}</strong>,
                                    Cheese:<strong>{order.ingredients.cheese}</strong>,
                                    Meat: <strong>{order.ingredients.meat}</strong></p>
                                </div>
                                <div style={{
                                    border: '1px solid #ccc',
                                    padding: '15px',
                                    margin: '5px',
                                    boxSizing: 'border-box'
                                }} >
                                    <h3 style={{
                                        textAlign:'center'
                                    }}>Customer Info:</h3>
                                    {customer}
                                </div>
                            </Aux>
                        )
                    })}
                </div>
            );
        }
        return(
            <Aux>
            <Modal show={this.state.cancelling} modalClosed={this.orderCancelClose}>
                {cancel}
            </Modal >
            <Modal show={this.state.viewing} modalClosed={this.orderViewClose}>
                {view}
                
            </Modal >
            <div>
                {order}
            </div>
            </Aux>
        );
    }
}
const mapStatetoProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token : state.auth.token,
        userId: state.auth.userId
    }
}
const mapDispatchtoProps = dispatch => {
    return{
        onFetchOrder: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
        onCancelOrder: (token, orderId) => dispatch(actions.cancelOrder(token, orderId))
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(withErrorHandler(Orders,axios));
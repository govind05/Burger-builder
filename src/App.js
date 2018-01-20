import React, { Component } from 'react';
import {Route, withRouter, Switch, Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth');
});

const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders');
});

class App extends Component {
  
  componentWillMount(){
    this.props.onTryAutoSignup()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/'  component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes=(
      <Switch>
        <Route path='/orders' component={asyncOrders} />
        <Route path='/checkout' component={asyncCheckout} />
        <Route path='/logout'   component={Logout} />
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact  component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
      );
    }
    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  };
};
const mapDispatchtoProps = dispatch => {
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(App));
import React,{Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../Auxi';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component{

    state= {
        sideDrawerOpen: false
    }
    
    sidedrawerClosedHandler = () => (
        this.setState({sideDrawerOpen: false})
    )
    sidedrawerToggleHandler = () => (
        this.setState( (prevState) => {
            return { sideDrawerOpen: !prevState.sideDrawerOpen};
        } )
    )

    render(){
        return(
            <Aux>
                <Toolbar 
                        isAuth={this.props.isAuthenticated} 
                        sideDrawerClick={this.sidedrawerToggleHandler}/>
                <SideDrawer 
                            isAuth={this.props.isAuthenticated} 
                            open={this.state.sideDrawerOpen} 
                            clicked={this.sidedrawerClosedHandler}/>
                
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
} 

const mapStatetoProps = state =>{
    return{
        isAuthenticated : state.auth.token !== null
    }
}
export default connect(mapStatetoProps)(Layout);
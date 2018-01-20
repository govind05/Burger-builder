import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    loading: false,
    token: null,
    userId: null,
    error: null,
    authRedirectPath: '/'
}
const authStart = (state, action) =>{
    return updateObject(state, {error:null , loading: true});
}
const authSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        token: action.idToken,
        error: null,
        userId: action.userId
    })
}
const authFail = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error    
    })
}
const authLogout =(state, action) =>{
    return updateObject(state, {
        token: null,
        userId: null
    })
}
const setAuthRedirectPath = (state, action) => {
    return updateObject(state,{
        authRedirectPath: action.authRedirectPath
    })
}
const reducer = (state= initialState, action) =>{
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action)
        default: return state;
    }
}

export default reducer;
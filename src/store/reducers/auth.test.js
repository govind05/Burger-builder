import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer',() => {
    it('should return initial state',()=>{
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            token: null,
            userId: null,
            error: null,
            authRedirectPath: '/'
        })
    })
    it('should store token value',()=>{
        expect(reducer({
            loading: false,
            token: null,
            userId: null,
            error: null,
            authRedirectPath: '/'
        }, {type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-userId'})).toEqual({
            loading: false,
            token: 'some-token',
            userId: 'some-userId',
            error: null,
            authRedirectPath: '/'
        })
    })
})
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../setAuthToken';
import jwt_decode from 'jwt-decode';

export const registerUser = (user, history) => dispatch => {
    debugger
    fetch("http://localhost:5001/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then(res => history.push('/login'))
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const loginUser = (user) => dispatch => {
    return fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
        .then((res) => { return res.json() })
        .then((data) => {
            debugger
            // console.log(res.data);
            if (data.token) {
                const { token } = data;
                localStorage.setItem('jwtToken', token);
                //setAuthToken(token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentUser(decoded));
            }
        })
        .catch(err => {
            debugger
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}
export const logoutUser = (history) => dispatch => {
    localStorage.removeItem('jwtToken');
    //setAuthToken(false);
    dispatch(setCurrentUser({}));
    history.push('/login');
}
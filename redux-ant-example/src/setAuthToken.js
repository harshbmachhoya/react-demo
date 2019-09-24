// import axios from 'axios';

const setAuthToken = token => {
    debugger
    if (token) {
        fetch.headers.common['Authorization'] = token;
    }
    else {
        delete fetch.headers.common['Authorization'];
    }
}

export default setAuthToken;
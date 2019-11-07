import CONFIG from './config';
import axios from 'axios';

export const loginUser = async (email, password) =>{
    const config = {
        method: 'POST',
        url: `${CONFIG.devURL}/auth/login`,
        headers: {
            'User-Agent': 'UIT CTF time Android app',
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        data: {
            email: email,
	        password: password
        }
    }
    return await axios.request(config);
}

export const registerUser = async (userInfo) => {
    const config = {
        method: 'POST',
        url: `${CONFIG.devURL}/auth/register`,
        headers: {
            'User-Agent': 'UIT CTF time Android app',
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        data: {
            userInfo
        }
    }
    return await axios.request({config});
}

export const saveUserData = async (data) => {

}
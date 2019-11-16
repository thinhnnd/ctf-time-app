import CONFIG from './config';
import axios from 'axios';
import qs from 'qs';

export const login = async (email, password) => {
    try {
        const data = {
            'email': email,
            'password': password
        }
        const response = await axios.post(`${CONFIG.devURL}/auth/login`, qs.stringify(data), {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
        return response;
    } catch (err) {
        // console.log(err);
        throw new Error(err.response.data.message);
    }

}
export const registerUser = async (email, full_name, password) => {
    const payload = {
        'email': email,
        'full_name': full_name,
        'password': password
    }
    const response = await axios.post(`${CONFIG.devURL}/auth/register`, (payload), {
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    });
    return response;
}

export const saveUserData = async (data) => {

}
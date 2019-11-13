import CONFIG from './config';
import axios from 'axios';
import qs from 'qs';
export const loginUser = async (email, password) => {
    const body = new URLSearchParams();
    body.append('email', email);
    body.append('password', password);
    const config = {
        method: 'POST',
        url: `${CONFIG.devURL}/auth/login`,
        headers: {
            'User-Agent': 'UIT CTF time Android app',
            'Accept': 'application/json',
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: {
            'email': email,
            'password': password
        }
    }
    console.log('login with :', email, password);

    axios.post(url, {
        email: email, password: password
    }, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log('axios error', err))
    return await axios.request(config);
}
export const login = async (email, password) => {
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
import CONFIG from './config';
import axios from 'axios';

export const loginUser = async (email, password) => {
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
    const url = 'https://uit-ctf-time.herokuapp.com/api/v1/auth/login';

    axios.post(url, {
        email: email,
        password: password
    }).then(res => {
        console.log(res.data);

    })
    return await axios.request(config);
}
export const login = async (email, password) => {
    const response = await fetch(`${CONFIG.devURL}/auth/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/x-www-form-urlencoded'
        },
        body: {
            email: email,
            password: password
        }
    });
    return response.json();
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
    return await axios.request({ config });
}

export const saveUserData = async (data) => {

}
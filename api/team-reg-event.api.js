import axios from 'axios';
import * as qs from 'qs';
import CONFIG from './config';
const url = CONFIG.devURL + '/register-event'
export const RegisterEvent = async (token, data) => {
    return await axios.post(url, qs.stringify(data), {
        headers: {
            authorization: 'Bearer ' + token
        }
    })
}
export const GetAllRegistrationEvents = async (token) => {
    return await axios.get(url, {
        headers: {
            authorization: 'Bearer ' + token
        }
    });
}
export const DeleteRegistrationEvent = async (token, data) => {
    return await axios.delete(url,
        { data: qs.stringify(data) },
        {
            headers: {
                authorization: 'Bearer ' + token
            }
        })
}
export const GetRankingOfEvent = async (event) => {
    return await axios.get(url + '/rank?event=' + event)
}
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
export const deleteRegistrationEvent = async (token, teamId, eventId) => {
    try {
        const res = await axios.delete(url, {   
            headers: {
                authorization: 'Bearer ' + token
            },
            data: {
                eventId: eventId,
                teamId: teamId
            }
        });
        return res;
    } catch (err) {
        throw new Error(err.message);
    }

}
export const GetRankingOfEvent = async (event) => {
    return await axios.get(url + '/rank?event=' + event)
}
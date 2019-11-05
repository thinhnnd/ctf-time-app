import CONFIG from './config';
import axios from 'axios';
export const getAllEvents = async () => {
    const response = await fetch(`${CONFIG.devURL}/events?limit=5`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
    });
    return response.json();
}
export const getEvent = async (id) => {
    const request = await axios.get(`${CONFIG.devURL}/${id}`);
    return request.data;
}

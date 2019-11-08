import axios from 'axios';
import CONFIG from './config';


export const getAllTeams = async () => {
    const result = await axios.get(`${devURL}/api/v1/teams`);
    return result.data;
}
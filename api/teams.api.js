import axios from 'axios';
import CONFIG from './config';


export const getAllTeams = async () => {
    return await axios.get(`${devURL}/api/v1/teams`);
}
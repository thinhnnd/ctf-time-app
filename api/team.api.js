import axios from 'axios';
import CONFIG from './config';
export const getAllTeams = async () => {
    const teams = await axios.get(`${CONFIG.devURL}/teams`);
    return teams.data;
}
export const getTeamDetails = async (id, token) => {
    const team = await axios.get(`${CONFIG.devURL}/teams/${id}`,{
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
    return team.data;
}
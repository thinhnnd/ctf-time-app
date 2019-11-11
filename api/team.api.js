import axios from 'axios';
import CONFIG from './config';
export const getAllTeams = async () => {
    const teams = await axios.get(`${CONFIG.devURL}/teams`);
    return teams.data;
}
export const getTeamDetails = async (id, token) => {
    console.log(id);
    console.log(`${CONFIG.devURL}/teams/${id}`);
    const team = await axios.get(`${CONFIG.devURL}/teams/${id}`,{
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
    console.log('team', team.data);
    return team.data;
}
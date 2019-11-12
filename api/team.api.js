import axios from 'axios';
import CONFIG from './config';
const url = `${CONFIG.devURL}/teams`;
export const getAllTeams = async () => {
    const teams = await axios.get(url);
    return teams.data;
}
export const getTeamDetails = async (id, token) => {
    const team = await axios.get(`${url}/${id}`, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    });
    return team.data;
}
export const CreateNewTeam = async (token, data) => {
    return await axios.post(url, qs.stringify(data), {
        headers: { authorization: 'Bearer ' + token }
    });
}
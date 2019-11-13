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
    console.log('team', team.data);
    return team.data;
}
export const createNewTeam = async (token, teamName) => {
    try {
        const config = {
            method: 'post',
            url: `${url}`,
            headers: {
                authorization: `Bearer ${token}`,
            },
            data: {
                teamName: teamName
            }
          }
        return res = await axios(config);
        
    }

    catch (err) {
        console.log(err);
    }
}
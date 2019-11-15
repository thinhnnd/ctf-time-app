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
    // console.log('team', team.data);
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
        res = await axios(config);
        return res.data;
    }
    catch (err) {
        let shortErr = new Error();
        // shortErr.
        // console.log('createTeam', err.response);
        throw new Error(err.response.data.message);   
     }
}

export const addNewMember = async (token, teamId, userToAdd) => {
    try {
        const config = {
            method: 'put',
            url: `${url}/${teamId}/add-member`,
            headers: {
                authorization: `Bearer ${token}`,
            },
            data: {
                member: userToAdd
            }
          }
        res = await axios(config);
        return res.data;
    } 
    catch (err) {
        // console.log(err.response);
        throw new Error(err.response.data.message);   
    }
}

export const deleteMember = async (token, teamId, userToRemove) => {
    try {
        const config = {
            method: 'put',
            url: `${url}/${teamId}/remove-member`,
            headers: {
                authorization: `Bearer ${token}`,
            },
            data: {
                userToRemoveId: userToRemove
            }
          }
        res = await axios(config);
        return res.data;
    } 
    catch (err) {
        // console.log(err.response);
        throw new Error(err.response.data.message);   
    }
}
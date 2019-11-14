import axios from 'axios';
import CONFIG from './config';
const url = `${CONFIG.devURL}/users`;

export const getUsersHaveNoTeam = async (token) => {
    try {
        console.log('token ', token);
        const users = await axios.get(`${url}?filter=no-team`, {
            headers: {
                authorization: `Bearer ${token}`,
            }
        });
        return users.data;

    }
    catch (err) {
        // throw new Error(err.response.data.message);
        throw new Error('Can not list user');
    }

}

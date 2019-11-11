import * as SecureStore from 'expo-secure-store';
export const setUserInfo = async user => {
    const briefUser = { _id, username, role, token } = user;
    try {
        await SecureStore.setItemAsync('user_info', JSON.stringify(briefUser));
    } catch (error) {
        console.log('Error while set user info:', error);
    }
}
export const getUserInfo = async () =>{
    try {
        return await SecureStore.getItemAsync('user_info');
    } catch (error) {
        console.log('Error while get user info:', error);
    }
}
export const clearUserInfo = async () => {
    SecureStore.deleteItemAsync('user_info');
}
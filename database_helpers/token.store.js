export const storeUserToken = async (token) => {
    try {
        await SecureStore.setItemAsync('token', JSON.stringify(token));
        return 'success';
    } catch (err) {
        console.log(err);
    }
}

export const getUserToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');
        return token;
    } catch (err) {
        console.log(err);
    }
}

export const clearUserToken = async () => {
    try {
        await SecureStore.deleteItemAsync('token');
        return 'clear success';
    } catch (e) {
        console.log(e);
    }
};

//test
export const  saveUserCredentials = async (userInfo) => {
    try {
        await AsyncStorage.setItem('key', 'I like to save it.');
        await this._retrieveData();
    } catch (e) {
        console.log(e);
    }
}

//test

export const _retrieveData = async () => {
    try {
        const value = await AsyncStorage.getItem('key');
        if (value !== null) {
            // We have data!!
            console.log(value);
        }
    } catch (error) {
        // Error retrieving data
    }
};
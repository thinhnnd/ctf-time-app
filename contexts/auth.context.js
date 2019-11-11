import React, { useState, useEffect, useContext, createContext } from 'react';
import DATABASE_HELPERS from '../database_helpers';

export const AuthContext = createContext(null);
const initAuthData = {};
export const AuthProvider = (props) => {
    const [authData, setAuthData] = useState(initAuthData);
    useEffect(() => {
        DATABASE_HELPERS.getUserInfo().then(userString => {
            const user = JSON.parse(userString);
            if (user) setAuthData(user);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);
    const onLogin = async user => {
        DATABASE_HELPERS.setUserInfo(user);
        setAuthData({ user });
    };
    const onLogout = async () => {
        DATABASE_HELPERS.clearUserInfo();
        setAuthData(initAuthData);
    }
    const value = { ...authData, onLogin, onLogout };
    return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>
}
export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
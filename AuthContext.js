import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const user = await AsyncStorage.getItem('user');
            setIsLoggedIn(user ? true : false);
        };
        checkLoginStatus();
    }, []);

    const login = async () => {
        console.log('🚀 Cập nhật trạng thái isLoggedIn = true');
    setIsLoggedIn(true);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('user');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

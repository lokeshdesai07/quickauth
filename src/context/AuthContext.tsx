import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    name?: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => boolean;
    signup: (name: string, email: string, password: string) => boolean;
    logout: () => void;
}

const AUTH_STORAGE_KEY = '@auth_user';

export const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    login: () => false,
    signup: () => false,
    logout: () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Load persisted auth state on mount
    useEffect(() => {
        loadAuthState();
    }, []);

    const loadAuthState = async () => {
        try {
            const storedUser = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Error loading auth state:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveAuthState = async (userData: User) => {
        try {
            await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
        } catch (error) {
            console.error('Error saving auth state:', error);
        }
    };

    const clearAuthState = async () => {
        try {
            await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
        } catch (error) {
            console.error('Error clearing auth state:', error);
        }
    };

    const login = (email: string, password: string): boolean => {
        if (!email.includes('@') || password.length < 6) return false;
        const userData = { email };
        setUser(userData);
        saveAuthState(userData);
        return true;
    };

    const signup = (name: string, email: string, password: string): boolean => {
        if (!name || !email.includes('@') || password.length < 6) return false;
        const userData = { name, email };
        setUser(userData);
        saveAuthState(userData);
        return true;
    };

    const logout = async () => {
        setUser(null);
        await clearAuthState();
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
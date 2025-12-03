import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import { AuthContext } from '../context/AuthContext';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../constants/colors';


const Stack = createStackNavigator();


export const AppNavigator = () => {
    const { user, isLoading } = useContext(AuthContext);

    // Show loading screen while checking for persisted auth state
    if (isLoading) {
        return (
            <NavigationContainer>
                <SafeAreaView style={{
                    flex: 1, backgroundColor: colors.white, justifyContent: 'center', alignItems: 'center',
                }}>
                    <Text style={{ fontSize: 16 }}>Waiting for your auth state...</Text>
                </SafeAreaView>
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer >
            {user ? (
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: colors.primary,
                        },
                        headerTintColor: colors.white,
                        headerTitleStyle: {
                            fontWeight: 'bold',
                        },
                    }}
                >
                    <Stack.Screen name="Welcome to myAuthApp" component={HomeScreen} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Signup"
                        component={SignupScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    );
};
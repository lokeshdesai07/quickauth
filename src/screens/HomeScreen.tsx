import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import CustomeButton from '../components/CustomeButton';
import { colors } from '../constants/colors';


const HomeScreen: React.FC = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <View style={styles.container}>

            <Text style={styles.welcomeText}>Welcome, Dear!</Text>
            <View style={{ backgroundColor: colors.primaryLight, padding: 10, borderRadius: 5, borderWidth: 1, borderColor: colors.primary }}>
                {user?.name && (<Text style={styles.emailText}>Name: {user.name}</Text>)}
                <Text style={styles.emailText}>Email: {user?.email}</Text>
            </View>
            <CustomeButton
                text="Logout"
                onPress={logout}
                textColor="white"
                backgroundColor={colors.primary}
                style={{ width: '100%' }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: "100%",
        backgroundColor: colors.primaryLighter,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeText: {
        fontSize: 16,
        color: colors.primary,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    nameText: {
        fontSize: 16,
        marginBottom: 10
    },
    labelText: {
        fontSize: 16,
        marginBottom: 5
    },
    emailText: {
        fontSize: 16,
        marginBottom: 20,
        color: colors.primary,
        fontWeight: 'bold'
    }
});

export default HomeScreen;

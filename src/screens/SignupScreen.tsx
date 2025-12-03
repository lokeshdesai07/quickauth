import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomeButton from '../components/CustomeButton';
import CustomTextInput from '../components/CustomTextInput';
import { colors } from '../constants/colors';


type Props = {
    navigation: StackNavigationProp<any>;
};


const SignupScreen: React.FC<Props> = ({ navigation }) => {
    const { signup } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const handleSignup = () => {
        setNameError("");
        setEmailError("");
        setPasswordError("");

        let isValid = true;

        // Name
        if (!name.trim()) {
            setNameError("Missing name field.");
            isValid = false;
        }

        // Email
        const emailRegex = /\S+@\S+\.\S+/;
        if (!email.trim()) {
            setEmailError("Missing email field.");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            setEmailError("Invalid email format.");
            isValid = false;
        }

        // Password
        if (!password.trim()) {
            setPasswordError("Missing password field.");
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            isValid = false;
        }

        if (!isValid) return;

        const success = signup(name, email, password);
        if (!success) {
            setPasswordError("Signup failed. Try again.");
        }
    };
    return (
        <KeyboardAvoidingView 
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.title}>MyAuthApp</Text>
                <Text style={styles.description}>Please enter your name, email and password to signup</Text>
                <View style={styles.content}>
                    <Text style={styles.subtitle}>Signup</Text>
                    <Text style={styles.label}>Name</Text>
                    <CustomTextInput
                        value={name}
                        onChangeText={setName}
                        placeholder="Name"
                    />
                    {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

                    <Text style={styles.label}>Email</Text>
                    <CustomTextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    <Text style={styles.label}>Password</Text>
                    <CustomTextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        showPasswordToggle={true}
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                    <CustomeButton
                        onPress={handleSignup}
                        text="Signup"
                        textColor="white"
                        backgroundColor={colors.primary}
                        style={{ width: '100%' }}

                    />
                    <CustomeButton
                        onPress={() => navigation.navigate('Login')} text="Go to Login"
                        textStyle={{ fontSize: 14, borderBottomWidth: 1, borderBottomColor: colors.primary }}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryLighter,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
        backgroundColor: colors.primaryLightest,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: '500',
        color: colors.primary
    },
    errorText: {
        color: colors.red,
        marginBottom: 10,
        alignSelf: 'flex-start'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.primary
    },
    description: {
        fontSize: 14,
        marginBottom: 20,
        color: colors.grey,
        fontWeight: 'bold'

    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        color: colors.primary,
        fontWeight: 'bold'
    }
})

export default SignupScreen;
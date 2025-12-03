import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { EyeIcon } from './EyeIcon';
import { colors } from '../constants/colors';

type CustomTextInputProps = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    showPasswordToggle?: boolean;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
    iconColor?: string;
};

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    showPasswordToggle = false,
    containerStyle,
    inputStyle,
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={[styles.container, containerStyle]}>
            <TextInput
                style={[styles.input, inputStyle]}
                placeholder={placeholder}
                secureTextEntry={showPasswordToggle ? !showPassword : secureTextEntry}
                value={value}
                onChangeText={onChangeText}
            />
            {showPasswordToggle && (
                <TouchableOpacity onPress={() => setShowPassword(s => !s)} style={{ padding: 10 }}>
                    <EyeIcon open={showPassword} />
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: colors.gray,
        borderRadius: 5,
        backgroundColor: colors.background,
        marginBottom: 10,
        marginTop: 10,
    },
    input: {
        flex: 1,
        padding: 10,
    },
    iconButton: {
        padding: 10,
    },
});

export default CustomTextInput;


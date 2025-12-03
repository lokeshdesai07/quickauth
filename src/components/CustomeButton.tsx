import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../constants/colors';

type CustomeButtonProps = {
    onPress: () => void;
    text: string;
    textColor?: string;
    backgroundColor?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
};

const CustomeButton: React.FC<CustomeButtonProps> = ({
    onPress,
    text,
    textColor = colors.primary,
    backgroundColor,
    style,
    textStyle
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                backgroundColor && { backgroundColor },
                style
            ]}
        >
            <Text style={[styles.text, { color: textColor }, textStyle]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        alignItems: "center",
        padding: 12,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
    },
});

export default CustomeButton;


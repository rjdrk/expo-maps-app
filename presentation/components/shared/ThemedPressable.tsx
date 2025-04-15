import { View, Text, Pressable, StyleSheet, PressableProps } from 'react-native'
import React from 'react'

interface Props extends PressableProps {
    children: string;
}

const ThemedPressable = ({ children, ...rest }: Props) => {
    return (
        <Pressable style={styles.btnPrimary} {...rest}>
            <Text style={styles.btnText}>{children}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    btnPrimary: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 100,
        margin: 10,
    },
    btnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
})

export default ThemedPressable
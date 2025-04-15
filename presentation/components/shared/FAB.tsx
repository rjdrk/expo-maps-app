import { View, Text, StyleSheet, Pressable, StyleProp, ViewStyle, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
    iconName: keyof typeof Ionicons.glyphMap;
    style?: StyleProp<ViewStyle>;
    onPress: () => void;
}

const FAB = ({ iconName, onPress, style }: Props) => {
    return (
        <View style={[styles.btn, style]}>
            <TouchableOpacity onPress={onPress}>
                <Ionicons name={iconName} color='white' size={35} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    btn: {
        zIndex: 99,
        position: 'absolute',
        height: 50,
        width: 50,
        borderRadius: 30,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 0.27,
            width: 4.5,
        },
        elevation: 5
    }
})
export default FAB

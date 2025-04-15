import { View, StyleSheet } from 'react-native'
import React from 'react'
import { ThemedText } from '@/presentation/components/shared/ThemedText'
import { usePremissionsStore } from '@/presentation/store/usePermissionsStore'
import ThemedPressable from '@/presentation/components/shared/ThemedPressable';

const PermisionsScreen = () => {
    const { locationStatus, requestLocationPermission } = usePremissionsStore();
    return (
        <View style={styles.container}>
            <ThemedPressable onPress={requestLocationPermission}>
                Habilitar Ubicación
            </ThemedPressable>
            <ThemedText>Estado Actual: {locationStatus}</ThemedText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default PermisionsScreen
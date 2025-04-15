import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import CustomMap from '@/presentation/components/maps/CustomMap'
import { usseLocationStore } from '@/presentation/store/useLocationStore'

const MapScreen = () => {
    const { lastKnowLocation, getLocation } = usseLocationStore();

    useEffect(() => {
        if (lastKnowLocation === null) {
            getLocation();
        }
    }, []);

    if (lastKnowLocation == null) {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        )
    }
    return (
        <View>
            <CustomMap
                initialLocation={lastKnowLocation}
            />
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
export default MapScreen
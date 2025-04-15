import { View, StyleSheet } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps'

const MapScreen = () => {
    return (
        <View style={styles.container}>
            <MapView
                showsPointsOfInterest={false}
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                    title='Aqui estoy'
                    description='Hola que hace'
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    }
});
export default MapScreen
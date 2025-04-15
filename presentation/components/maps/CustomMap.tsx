import { View, StyleSheet, ViewProps } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { LatLng } from '@/infrastructure/interfaces/lat-lng';
import MapView, { Polyline } from 'react-native-maps';
import { usseLocationStore } from '@/presentation/store/useLocationStore';
import FAB from '../shared/FAB';

interface Props extends ViewProps {
    showUserLocation?: boolean;
    initialLocation: LatLng;
}

const CustomMap = ({
    initialLocation,
    showUserLocation = true,
    ...rest
}: Props) => {

    const mapRef = useRef<MapView>(null);
    const [isFollowingUser, setIsFollowingUser] = useState(true);
    const [isShowingPolyline, setIsShowingPolyline] = useState(true);


    const {
        watchLocation,
        clearWatchLocation,
        lastKnowLocation,
        getLocation,
        userLocationList
    } = usseLocationStore();

    useEffect(() => {
        watchLocation();
        return () => {
            clearWatchLocation();
        }
    }, []);


    useEffect(() => {
        if (lastKnowLocation && isFollowingUser) {
            moveCameraToLocation(lastKnowLocation);
        }

    }, [lastKnowLocation, isFollowingUser])

    const moveCameraToLocation = (latLng: LatLng) => {
        if (!mapRef.current) return;
        mapRef.current.animateCamera({
            center: latLng,
        });
    }

    const moveCurrentLocation = async () => {
        if (!lastKnowLocation) {
            moveCameraToLocation(initialLocation);
        } else {
            moveCameraToLocation(lastKnowLocation);
        }

        const location = await getLocation();
        if (!location) return;

        moveCameraToLocation(location);

    }

    return (
        <View {...rest}>
            <MapView
                ref={mapRef}
                onTouchStart={() => setIsFollowingUser(false)}
                showsPointsOfInterest={false}
                showsUserLocation={showUserLocation}
                style={styles.map}
                initialRegion={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {isShowingPolyline && (
                    <Polyline
                        coordinates={userLocationList}
                        strokeColor={'black'}
                        strokeWidth={5}
                    />
                )}
            </MapView>
            <FAB
                iconName={isFollowingUser ? 'eye-outline' : 'eye-off-outline'}
                onPress={() => setIsShowingPolyline(!isShowingPolyline)}
                style={styles.btn_eye}
            />
            <FAB
                iconName={isFollowingUser ? 'walk-outline' : 'accessibility-outline'}
                onPress={() => setIsFollowingUser(!isFollowingUser)}
                style={styles.btn_follow}
            />
            <FAB
                iconName='compass-outline'
                onPress={moveCurrentLocation}
                style={styles.btn_compass}
            />
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
    },
    btn_compass: {
        bottom: 20,
        right: 20,
    },
    btn_follow: {
        bottom: 80,
        right: 20,
    },
    btn_eye: {
        bottom: 140,
        right: 20,
    }
});
export default CustomMap


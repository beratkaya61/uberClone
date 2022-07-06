import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Animated, AnimatedRegion } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../global/data';
import { mapStyle } from '../global/mapStyle';
import { colors, parameters } from '../global/styles';


const MapComponent = (props) => {

    const _map = useRef(1);

    const { userOrigin: origin, userDestination: destination } = props;
    const [latitudeDelta, setLatitudeDelta] = useState(0.00522);
    const [longitudeDelta, setLongitudeDelta] = useState(parameters.SCREEN_WIDTH / parameters.SCREEN_HEIGHT * 0.00522);
    console.log('MapComponent props origin ', origin)
    console.log('MapComponent props destination ', destination)

    // const ASPECT_RATIO = parameters.SCREEN_WIDTH / parameters.SCREEN_HEIGHT
    // const LATITUDE_DELTA = 60 //Very high zoom level
    // const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

    // const showMarkers = (region) => {
    //     let zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2)
    //     return zoom
    // }

    useEffect(() => {
        setLatitudeDelta(0.00522);
        setLongitudeDelta(parameters.SCREEN_WIDTH / parameters.SCREEN_HEIGHT * 0.00522);
    }, [])

    const onMapReadyHandler = useCallback(() => {

        if (destination.latitude !== null) {
            setTimeout(() => {
                _map?.current?.fitToCoordinates([origin, destination], {
                    edgePadding: { top: 450, right: 50, left: 50, bottom: 350 },
                    animated: true
                });
            }, 1000)
        }
    }, [destination]);

    const onPressZoomIn = useCallback(() => {

        // setLatitudeDelta(latitudeDelta + 0.00522);
        // setLongitudeDelta(longitudeDelta + parameters.SCREEN_WIDTH / parameters.SCREEN_HEIGHT * 0.00522);

        // _map?.current?.animateToRegion({
        //     latitude: origin.latitude,
        //     longitude: origin.longitude,
        //     latitudeDelta: latitudeDelta,
        //     longitudeDelta: longitudeDelta
        // }, 100)

    }, [latitudeDelta, longitudeDelta]);

    const onPressZoomOut = useCallback(() => {

        // setLatitudeDelta(latitudeDelta - 0.00522);
        // setLongitudeDelta(longitudeDelta - parameters.SCREEN_WIDTH / parameters.SCREEN_HEIGHT * 0.00522);

        // _map?.current?.animateToRegion({
        //     latitude: origin.latitude,
        //     longitude: origin.longitude,
        //     latitudeDelta: latitudeDelta,
        //     longitudeDelta: longitudeDelta
        // }, 100)
    }, [latitudeDelta, longitudeDelta]);


    return (
        <View>
            <Animated
                zoomControlEnabled={true}
                zoomEnabled={true}
                // initialCamera={{
                //     center: {
                //         latitude: origin.latitude,
                //         longitude: origin.longitude
                //     },
                //     // heading: 0,
                //     // pitch: 0,
                //     // zoom: 15,
                //     // altitude: 0,
                // }}
                minZoomLevel={5} // default => 0
                maxZoomLevel={10} // default => 20
                initialRegion={new AnimatedRegion({
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta
                })}

                onMapReady={onMapReadyHandler}
                showsCompass={true}
                showsBuildings={true}
                //showsTraffic={true}
                showsIndoors={true}

                followsUserLocation={true}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={mapStyle}
                ref={_map}
                showsUserLocation={true}
                showsMyLocationButton={true}
                loadingEnabled
                onRegionChange={region => {
                    console.log('MapComponent onRegionChange region ', region)
                }}
            >
                {origin.latitude != null &&
                    <MapView.Marker
                        name="origin"
                        coordinate={props.userOrigin}
                        anchor={{ x: 0.5, y: 0.5 }} >
                        <Icon
                            name="location-on"
                            type="material"
                            color={colors.darkred}
                            size={50}
                        />
                    </MapView.Marker>
                }
                {destination.latitude != null &&
                    <MapView.Marker
                        name="destination"
                        coordinate={props.userDestination}
                        anchor={{ x: 0.5, y: 0.5 }} >
                        <Icon
                            name="location-on"
                            type="material"
                            color={colors.lightgreen}
                            size={50}
                        />
                    </MapView.Marker>
                }
                {destination.latitude !== null &&
                    <MapViewDirections
                        origin={origin}
                        destination={destination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor={colors.blue}
                    />
                }

                {/* <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                /> */}

            </Animated>
            <TouchableOpacity
                style={styles.zoomIn}
                onPress={() => onPressZoomIn()}
            >
                <Icon
                    name='add'
                    color={colors.white}
                    size={30}
                />
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.zoomOut}
                onPress={() => onPressZoomOut()}
            >
                <Icon
                    name="remove"
                    color={colors.white}
                    size={30}
                />
            </TouchableOpacity>
        </View >
    )
}

export default MapComponent

const styles = StyleSheet.create({
    map: {
        height: "100%",
        width: "100%"
    },
    zoomIn: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderRadius: 30,
        bottom: 300,
        left: 10,
        backgroundColor: colors.black,
    },
    zoomOut: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40,
        borderRadius: 30,
        bottom: 250,
        left: 10,
        backgroundColor: colors.black,
    },
    markerWrapOrigin: {
        //  alignItems: "center",
        // justifyContent: "center",
        width: 40,
        height: 20,
        // marginTop:0
    },
    markerOrigin: {
        width: 16,
        height: 16,
        borderRadius: 8
    },
    destination: {
        width: 20,
        height: 20,
        backgroundColor: colors.black,
        alignItems: "center",
        justifyContent: "center"
    },
    view1: {
        width: 7,
        height: 7,
        backgroundColor: colors.white
    },
    markerDestination: {
        width: 16,
        height: 16,
    },
    markerOrigin2: {
        width: 20,
        height: 20,
        borderRadius: 10
    },
    car: {
        paddingTop: 0,
        width: 40,
        height: 20,
    },
    view2: {
        position: "absolute",
        top: 10,
        right: 12,
        backgroundColor: colors.white,
        height: 40,
        width: 180,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        zIndex: 8
    },
    view3: {
        flexDirection: "row",
        alignItems: "center",
        //marginRight:15,
        //backgroundColor:"white",
        //paddingHorizontal:2,
        paddingVertical: 2,
        //borderRadius:20
    },
    view4: {
        position: "absolute",
        top: 50,
        left: 12,
        backgroundColor: colors.white,
        height: 40,
        width: 140,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 2,
        zIndex: 8
    },
    location: {
        width: 20,
        height: 20,
        borderRadius: 9,
        backgroundColor: colors.black,
        alignItems: "center",
        justifyContent: "center"
    },
    view9: {
        width: 6,
        height: 6,
        borderRadius: 4,
        backgroundColor: "white"
    }
})
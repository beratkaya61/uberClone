import React, { useRef } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '../global/data';
import { mapStyle } from '../global/mapStyle';
import { colors } from '../global/styles';


const MapComponent = (props) => {

    const _map = useRef(1);

    console.log('MapComponent props origin: ', props.userOrigin);
    

    const origin = props.userOrigin;
    const destination = { latitude: 42.2929175, longitude: -71.0548235 };

    return (
        <View>
            <MapView
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={mapStyle}
                ref={_map}
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsIndoors
                loadingEnabled
            >
                {props?.userOrigin.latitude != null &&
                    <MapView.Marker coordinate={props.userOrigin} anchor={{ x: 0.5, y: 0.5 }} >
                        <Image
                            source={require('../../assets/location.png')}
                            style={styles.markerOrigin2}
                            resizeMode="cover"
                        />
                    </MapView.Marker>
                }
                {props?.userDestination.latitude != null &&
                    <MapView.Marker coordinate={props.userDestination} anchor={{ x: 0.5, y: 0.5 }} >
                        <Image
                            source={require('../../assets/location.png')}
                            style={styles.markerDestination}
                            resizeMode="cover"
                        />
                    </MapView.Marker>
                }
                {props?.userDestination.latitude !== null &&
                    <MapViewDirections
                        origin={props?.userOrigin}
                        destination={props?.userDestination}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={4}
                        strokeColor={colors.black}
                    />
                }

                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    //apikey={GOOGLE_MAPS_APIKEY}
                />

            </MapView>
        </View>
    )
}

export default MapComponent

const styles = StyleSheet.create({
    map: {
        height: "100%",
        width: "100%"
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
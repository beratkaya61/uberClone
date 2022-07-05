import React, {
    useEffect,
    useRef,
    useState,
    useContext,
} from 'react'

import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    FlatList,
    LogBox
} from 'react-native'

import { StatusBar } from 'expo-status-bar'
import { Icon } from 'react-native-elements'
import MapView, { PROVIDER_GOOGLE, } from 'react-native-maps';
import * as Location from 'expo-location';
import { colors, parameters } from '../global/styles'
import { mapStyle } from '../global/mapStyle'
import { filterData, visitedLocations, carsAround } from '../global/data'
import { CurrentLocationContext } from '../contexts/context';

const HomeScreen = ({ navigation }) => {

    const _map = useRef(1);

    const [latlng, setLatLng] = useState(null)
    const { currentLocation, currentLocationDispatch } = useContext(CurrentLocationContext);


    const checkPermission = async () => {
        const hasPermission = await Location.requestForegroundPermissionsAsync();
        if (hasPermission.status === 'granted') {
            const permission = await askPermission();
            return permission
        }
        return true
    };

    const askPermission = async () => {
        const permission = await Location.requestForegroundPermissionsAsync()
        return permission.status === 'granted';
    };

    const getLocation = async () => {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync();
            if (!granted) return;
            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync();

            currentLocationDispatch({
                type: 'SET_CURRENT_LOCATION',
                payload: {
                    latitude,
                    longitude,
                    address: null,
                    name: null,
                },
            });

            setLatLng({ latitude: latitude, longitude: longitude })

        } catch (err) {
            console.log('error while getting location', err);
        }
    }

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
        checkPermission();
        getLocation()
        console.log('currentLocation context state : ', currentLocation)
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}
                    style={styles.headerIcon}>
                    <Icon name="menu" size={30} color={colors.white} />
                </TouchableOpacity>
            </View>
            <StatusBar backgroundColor='#2058c0' translucent={true} />
            <ScrollView indicatorStyle='white' bounces={false}>
                {/* explanation container */}
                <View style={styles.explanationContainer}>
                    <Text style={styles.explanationHeader}>Destress your commute</Text>
                    <View style={styles.explanationBody}>
                        <View style={styles.explanationBody1}>
                            <Text style={styles.explanationBodyText}>Read a book.Take a nap. Stare out the window</Text>
                            <TouchableOpacity
                                style={styles.explanationBodyButton}
                                onPress={() => { navigation.navigate("Request", { state: 0 }) }}>
                                <Text style={styles.button1Text}>Ride with Uber</Text>
                            </TouchableOpacity>
                        </View>
                        <Image
                            style={{
                                height: 100,
                                width: 100,
                            }}
                            source={require('../../assets/uberCar.png')}
                        />
                    </View>
                </View>

                {/* filter options */}
                <View>
                    <FlatList
                        data={filterData}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        keyextractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity style={styles.filterCard}>
                                    <View style={styles.filterItemImageContainer}>
                                        <Image style={styles.filterItemImage} source={item.image} />
                                    </View>
                                    <Text style={styles.filterItemText}> {item.name}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>

                {/* select position */}
                <View style={styles.positionContainer}>
                    <Text style={styles.positionText}>Where to?</Text>
                    <View style={styles.positionClock}>
                        <Icon type="material-community"
                            name="clock-time-four"
                            color={colors.grey1}
                            size={26}
                        />
                        <Text style={{ marginLeft: 5 }}>Now</Text>
                        <Icon type="material-community"
                            name="chevron-down"
                            color={colors.grey1}
                            size={26}
                        />
                    </View>
                </View>

                {/* recent visited locations */}
                <View style={styles.recentLocationsContainer}>
                    <FlatList
                        data={visitedLocations}
                        showsVerticalScrollIndicator={false}
                        keyextractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.recentLocationsCardContainer}>
                                    <View style={styles.recentLocationsBody}>
                                        <View style={styles.locationIcon}>
                                            <Icon type="material-community"
                                                name="map-marker"
                                                color={colors.black}
                                                size={22}
                                            />
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 18, color: colors.black }}>{item.street}</Text>
                                            <Text style={{ color: colors.grey3 }}>{item.area}</Text>
                                        </View>
                                    </View>
                                    <Icon type="material-community"
                                        name="chevron-right"
                                        color={colors.grey}
                                        size={26}
                                    />
                                </View>
                            )
                        }}
                    />

                </View>

                <Text style={styles.mapAround}> Around you</Text>

                {/* map */}
                <View style={styles.mapContainer}>
                    <MapView
                        ref={_map}
                        provider={PROVIDER_GOOGLE}
                        style={styles.map}
                        customMapStyle={mapStyle}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        initialRegion={{ ...carsAround[0], latitudeDelta: 0.008, longitudeDelta: 0.008 }}
                    >
                        {carsAround.map((item, index) =>
                            <MapView.Marker coordinate={item} key={index.toString()}>
                                <Image
                                    source={require('../../assets/carMarker.png')}
                                    style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                    resizeMode="contain"
                                />
                            </MapView.Marker>

                        )}
                    </MapView>
                </View>
            </ScrollView>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingBottom: 30,
        paddingTop: parameters.statusBarHeight
    },
    header: {
        backgroundColor: colors.blue,
        height: parameters.headerHeight,
        justifyContent: 'center',
        alignItems: "flex-start"
    },
    explanationContainer: {
        backgroundColor: colors.blue,
        paddingLeft: 20,
    },
    explanationHeader: {
        color: colors.white,
        fontSize: 21,
        paddingVertical: 20,
    },
    explanationBody: {
        flexDirection: "row",
        flex: 1,
        paddingTop: 30
    },
    explanationBody1: {
        flex: 1,
        marginTop: -25
    },
    explanationBodyButton: {
        height: 40,
        width: 150,
        backgroundColor: colors.black,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    explanationBodyText: {
        color: colors.white,
        fontSize: 16
    },
    filterCard: {
        alignItems: "center",
        margin: parameters.SCREEN_WIDTH / 22
    },
    filterItemImageContainer: {
        marginBottom: 5,
        borderRadius: 15,
        backgroundColor: colors.grey6
    },
    filterItemImage: {
        height: 60,
        width: 60,
        borderRadius: 15,
    },
    filterItemText: {
        color: colors.black,
        fontSize: 12
    },
    button1Text: {
        color: colors.white,
        fontSize: 17,
        marginTop: -2
    },
    positionContainer: {
        flexDirection: "row",
        height: 50,
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 10,
        backgroundColor: colors.grey6,
        alignItems: "center",
        justifyContent: "space-between",
    },
    positionText: {
        marginLeft: 15,
        fontSize: 16,
        color: colors.black
    },
    positionClock: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 15
    },
    recentLocationsContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.white,
    },
    recentLocationsCardContainer: {
        flex: 1,
        flexDirection: 'row',
        borderBottomColor: colors.grey6,
        borderBottomWidth: 1,
        paddingVertical: 25,
        marginHorizontal: 15,
    },
    recentLocationsBody: {
        flex: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    locationIcon: {
        height: 40,
        width: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.grey6,
        borderRadius: 20,
        marginRight: 20
    },
    mapAround: {
        fontSize: 20,
        color: colors.black,
        margin: 20,
    },
    mapContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 100,
    },
    map: {
        height: 200,
        width: parameters.SCREEN_WIDTH * 0.92
    },
    headerIcon: {
        marginLeft: 10,
        marginTop: 5
    },
    location: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: colors.blue,
        alignItems: "center",
        justifyContent: "center"

    },
    view9: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: "white"
    }
})
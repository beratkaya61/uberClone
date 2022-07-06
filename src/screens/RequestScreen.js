import React, {
    useRef,
    useCallback,
    useMemo,
    useContext,
    useState,
    useEffect
} from 'react'

import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native'
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Avatar, Icon } from 'react-native-elements'

import MapComponent from '../components/MapComponent'
import { colors, parameters } from '../global/styles'
import { rideData } from '../global/data';
import { CurrentLocationContext, DestinationLocationContext } from '../contexts/context';


const RequestScreen = ({ route, navigation }) => {

    const bottomSheetRef = useRef(null);
    const snapPoints = useMemo(() => ['70%'], []);
    const handleSheetChange = useCallback((index) => {
        console.log("handleSheetChange", index);
    }, [])
    const handleSnapPress = useCallback((index) => {
        bottomSheetRef.current?.snapToIndex(index);
    }, []);
    const handleClosePress = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    //it hold the current location that saved to the context
    const { currentLocation, currentLocationDispatch } = useContext(CurrentLocationContext);

    //it hold the destination location that saved to the context
    const { destinationLocation, destinationLocationDispatch } = useContext(DestinationLocationContext);

    const [userCurrentLocation, setUserCurrentLocation] = useState({
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
    });

    const [userDestionationLocation, setUserDestionationLocation] = useState({
        latitude: destinationLocation.latitude,
        longitude: destinationLocation.longitude,
    });

    //if currentLocation and destinationLocation that saved to context is changed, update the state
    useEffect(() => {
        setUserCurrentLocation({
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude
        });

        setUserDestionationLocation({
            latitude: destinationLocation.latitude,
            longitude: destinationLocation.longitude
        })

    }, [currentLocation, destinationLocation])

    const renderFlatListItems = useCallback(({ item }) => (
        <View>
            <View style={styles.bottomSheetItemContainer}>
                <View style={styles.bottomSheetItemIconContainer}>
                    <Icon
                        type="material-community"
                        name="clock-time-four"
                        color={colors.white}
                        size={18}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 15, color: colors.grey1 }}>{item.street}</Text>
                    <Text style={{ color: colors.grey4 }}>{item.area}</Text>
                </View>
            </View>
        </View>
    ), [])

    const renderBottomSheet = () => {
        return (
            <BottomSheet
                ref={bottomSheetRef}
                index={route.params.state}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
            >
                <View style={styles.bottomSheetContainer}>
                    <View style={styles.bottomSheetHeaderContainer}>
                        <TouchableOpacity
                            style={styles.bottomSheetHeaderCloseContainer}
                            onPress={handleClosePress}>
                            <Icon
                                type="material-community"
                                name="close"
                                color={colors.white}
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomSheetBodyContainer}>
                        <BottomSheetFlatList
                            keyboardShouldPersistTaps='always'
                            data={rideData}
                            keyExtractor={item => item.id}
                            renderItem={renderFlatListItems}
                            indicatorStyle='white'
                            contentContainerStyle={styles.contentContainer}
                            ListHeaderComponent={
                                <View style={styles.bottomSheetItemContainer}>
                                    <View style={styles.bottomSheetItemIconContainer}>
                                        <Icon
                                            type="material-community"
                                            name="star"
                                            color={colors.white}
                                            size={20}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            fontSize: 16,
                                            color: colors.grey3,
                                            fontWeight: 'bold'
                                        }}
                                    >Saved Places</Text>
                                </View>
                            }
                            ListFooterComponent={
                                <View>
                                    <View style={styles.bottomSheetItemContainer}>
                                        <View style={styles.bottomSheetItemIconContainer}>
                                            <Icon
                                                type="material-community"
                                                name="map-marker"
                                                color={colors.white}
                                                size={20}
                                            />
                                        </View>
                                        <Text
                                            style={{
                                                fontSize: 16,
                                                color: colors.grey3,
                                                fontWeight: 'bold'
                                            }}
                                        >Set location on map</Text>
                                    </View>
                                    <View style={styles.bottomSheetItemContainer}>
                                        <View style={styles.bottomSheetItemIconContainer}>
                                            <Icon
                                                type="material-community"
                                                name="skip-next"
                                                color={colors.white}
                                                size={20}
                                            />
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    color: colors.grey3,
                                                    fontWeight: 'bold'
                                                }}
                                            >Enter destination later</Text>
                                        </View>
                                    </View>
                                </View>
                            }
                        />
                    </View>
                </View>
            </BottomSheet>
        )
    }

    return (
        <View style={styles.container}>

            <View style={styles.locationHeader}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: parameters.SCREEN_WIDTH,
                        marginBottom: 20,
                    }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            marginLeft: 20,
                        }}>
                        <Icon
                            type="material-community"
                            name="arrow-left"
                            color={colors.grey1}
                            size={30}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.choosePerson}>
                        <Avatar
                            rounded
                            size={30}
                            source={require('../../assets/blankProfilePic.jpg')}
                        />
                        <Text style={{ marginHorizontal: 5 }}>For Someone</Text>
                        <Icon
                            type="material-community"
                            name="chevron-down"
                            color={colors.grey1}
                            size={26}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.positionContainer}>
                    <Image
                        style={styles.image1}
                        source={require("../../assets/transit.png")}
                    />
                    <View>
                        <TouchableOpacity
                            style={styles.fromWhereContainer}
                            onPress={() => navigation.navigate("Destination")}>
                            <Text style={styles.fromWhereText}>{currentLocation.address ? currentLocation.address : 'From where'}</Text>
                        </TouchableOpacity>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <TouchableOpacity style={{
                                backgroundColor: colors.grey7,
                                width: parameters.SCREEN_WIDTH * 0.70,
                                height: 40,
                                justifyContent: "center",
                                marginTop: 10,
                            }}>
                                <Text
                                    style={{
                                        color: colors.grey2,
                                        paddingLeft: 10
                                    }}>{destinationLocation.address ? destinationLocation.address : '...'}</Text>
                            </TouchableOpacity>
                            <Icon
                                style={{ marginLeft: 10 }}
                                type="material-community"
                                name="plus-thick"
                                color={colors.grey3}
                                size={25}
                            />
                        </View>
                    </View>

                </View>
            </View>

            <MapComponent
                userOrigin={userCurrentLocation}
                userDestination={userDestionationLocation}
            />

            {renderBottomSheet()}
        </View>
    )
}

export default RequestScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    locationHeader: {
        height: parameters.SCREEN_HEIGHT * 0.21,
        alignItems: "center",
        zIndex: 8,
    },
    choosePerson: {
        flexDirection: "row",
        marginLeft: parameters.SCREEN_WIDTH * 0.2,
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 10,
    },
    positionContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    contentContainer: {
        backgroundColor: colors.white
    },
    fromWhereContainer: {
        backgroundColor: colors.grey6,
        width: parameters.SCREEN_WIDTH * 0.70,
        height: 40,
        justifyContent: "center",
        marginTop: 10,
    },
    fromWhereText: {
        marginLeft: 10,
        fontSize: 16,
        color: colors.grey1
    },
    image1: {
        height: 70,
        width: 30,
        marginRight: 10,
        marginTop: 10
    },
    bottomSheetContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    bottomSheetHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 15,
        backgroundColor: colors.white,
    },
    bottomSheetHeaderCloseContainer: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor: colors.grey,
    },
    bottomSheetBodyContainer: {
        flex: 14,
        backgroundColor: colors.white,
    },
    bottomSheetItemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey5
    },
    bottomSheetItemIconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: colors.grey,
        marginRight: 15
    },
    view12: {
        alignItems: "center",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey4
    },
    text2: {
        fontSize: 18,
        color: colors.grey1
    },
    text3: {
        fontSize: 16,
        color: colors.black,
        fontWeight: "bold",
        marginRight: 5,
    },
    text4: {
        color: colors.grey2,
        marginTop: 4
    },
    view13: {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 5
    },
    button1: {
        height: 40,
        width: 100,
        backgroundColor: colors.grey6,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20
    },
    button2: {
        height: 50,
        backgroundColor: colors.grey10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginHorizontal: 30
    },
    button1Text: {
        fontSize: 17,
        marginTop: -2,
        color: colors.black
    },
    button2Text: {
        color: colors.white,
        fontSize: 23,
        marginTop: -2,
    },
    view14: {
        alignItems: "center",
        flex: 5,
        flexDirection: "row"
    },
    view15: {
        backgroundColor: colors.grey6,
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 20
    },
    view16: {
        flexDirection: "row",
        alignItems: "baseline"
    },
    text5: {
        fontSize: 12,
        color: colors.black,
        marginLeft: 3,
        fontWeight: "bold",
        paddingBottom: 1
    },
    view19: {
        flex: 1.7,
        alignItems: "flex-end",
    },
    icon: { paddingBottom: 2 },
    image2: { height: 60, width: 60 },
    view20: { marginRight: 10 },
    text6: {
        fontSize: 15,
        color: colors.black,
        fontWeight: "bold",
    },
    view21: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginHorizontal: 30,
        marginTop: 15
    },
    view22: {
        alignItems: "center",
        marginBottom: -20
    },
    sectionHeaderContainer: {
        backgroundColor: "white",
        marginTop: 30,
        paddingLeft: 15
    },
    text7: {
        fontSize: 28,
        color: colors.black,
        marginRight: 5,
    },
    text8: {
        fontSize: 15,
        color: colors.grey2,
        textDecorationLine: "line-through"
    },
    button3: {
        height: 60,
        backgroundColor: colors.black,
        alignItems: "center",
        justifyContent: "center",
        width: parameters.SCREEN_WIDTH - 110,
        marginBottom: 10
    },
    view23: {
        flexDirection: "row",
        backgroundColor: colors.cardbackground,
        // elevation:10,
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingHorizontal: 20,
        height: 80,
    },
    button2Image: {
        height: 55,
        width: 55,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.grey6,
        marginBottom: 10,
    },
    map: {
        marginVertical: 0,
        width: parameters.SCREEN_WIDTH,
        zIndex: -1
    },
    centeredView: {
        zIndex: 14
    },
    modalView: {
        marginHorizontal: 20,
        marginVertical: 60,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        zIndex: 16
    },
    view24: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 15,
        paddingHorizontal: 20
    },
    view25: {
        flexDirection: 'row',
        alignItems: "baseline"
    },
    flatlist: {
        marginTop: 20
    },
})
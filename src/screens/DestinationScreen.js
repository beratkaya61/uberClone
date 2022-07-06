import React, { useContext, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, LogBox } from 'react-native'
import { Icon, Avatar } from 'react-native-elements'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { CurrentLocationContext, DestinationLocationContext } from '../contexts/context';
import { GOOGLE_MAPS_APIKEY } from '../global/data';
import { colors, parameters } from '../global/styles'

const DestinationScreen = ({ navigation }) => {
    const [destination, setDestination] = useState(false)

    const textInputFrom = useRef(null);
    const textInputGoingTo = useRef(null);

    useEffect(() => {
        LogBox.ignoreLogs(["If you are using React Native v0.60.0+ you must follow these instructions to enable currentLocation"])
    }, [])

    //it hold the current location that saved to the context
    const { currentLocationDispatch } = useContext(CurrentLocationContext);

    //it hold the destination location that saved to the context
    const { destinationLocationDispatch } = useContext(DestinationLocationContext);


    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.backButtonContainer}>
                    <Icon
                        type="material-community"
                        name="arrow-left"
                        color={colors.grey1}
                        size={32}
                        onPress={() => navigation.goBack()}
                    />
                </View>
                <TouchableOpacity style={styles.choosePersonContainer}>
                    <Avatar
                        rounded
                        avatarStyle={{}}
                        size={30}
                        source={require('../../assets/blankProfilePic.jpg')}
                    />
                    <Text style={{ marginLeft: 5 }}>For Someone</Text>
                    <Icon
                        type="material-community"
                        name="chevron-down"
                        color={colors.grey1}
                        size={26}
                    />
                </TouchableOpacity>
            </View>
            {destination === false &&
                <GooglePlacesAutocomplete
                    currentLocationLabel='Current Location'
                    //which API to use for current location    
                    nearbyPlacesAPI='GooglePlacesSearch'

                    placeholder="From..."

                    //override the default behavior of showing the list (results) view
                    listViewDisplayed="auto"

                    //debounce the requests (in ms)
                    debounce={400}
                    currentLocation={true}
                    ref={textInputFrom}

                    //minimum length of text to trigger a search
                    minLength={2}

                    //show "powered by Google" at the bottom of the search results list
                    enablePoweredByContainer={false}

                    //get more place details about the selected option from the Place Details API
                    fetchDetails={true}
                    enableHighAccuracyLocation={true}
                    autoFocus={true}
                    styles={autoCompleteStyle}

                    //"query" object for the Google Places Autocomplete API (link)
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en"
                    }}

                    // GoogleReverseGeocodingQuery={{
                    //     // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    //   }}

                    // GooglePlacesSearchQuery={{
                    //     // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                    //     rankby: 'distance',
                    //     types: 'food'
                    //   }}

                    renderLeftButton={() =>
                        <Icon
                            style={{ marginLeft: 10 }}
                            name='search'
                            color={colors.grey1}
                            size={24}
                        />
                    }
                    onPress={(data, details = null) => {
                        console.log('GooglePlacesAutocomplete : ', details)

                        currentLocationDispatch({
                            type: 'SET_CURRENT_LOCATION',
                            payload: {
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                address: details.formatted_address,
                                name: details.name
                            },
                        });
                        setDestination(true)
                    }}

                />
            }
            {destination === true &&
                <GooglePlacesAutocomplete
                    nearbyPlacesAPI='GooglePlacesSearch'
                    placeholder="Going to..."
                    listViewDisplayed="auto"
                    debounce={400}
                    currentLocation={true}
                    ref={textInputGoingTo}
                    minLength={2}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    autoFocus={true}
                    styles={autoCompleteStyle}
                    query={{
                        key: GOOGLE_MAPS_APIKEY,
                        language: "en"
                    }}
                    renderLeftButton={() =>
                        <Icon
                            style={{ marginLeft: 10 }}
                            name='search'
                            color={colors.grey1}
                            size={24}
                        />
                    }

                    onPress={(data, details = null) => {
                        destinationLocationDispatch({
                            type: "SET_DESTINATION_LOCATION",
                            payload: {
                                latitude: details.geometry.location.lat,
                                longitude: details.geometry.location.lng,
                                address: details.formatted_address,
                                name: details.name
                            },
                        })

                        navigation.navigate("Request", { state: -1 })
                    }}

                />
            }
        </View>
    )
}

export default DestinationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    headerContainer: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        padding: 10,
        alignItems: "center",
    },
    backButtonContainer: {
        height: 30,
        width: 30,
        justifyContent: "center",
        alignItems: "center",
    },
    choosePersonContainer: {
        flexDirection: "row",
        alignItems: "center",
        height: 30,
        marginLeft: parameters.SCREEN_WIDTH * 0.2,
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
        marginTop: 20,
        zIndex: 17,
        elevation: 8
    },
});


const autoCompleteStyle = {
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: colors.white
    },
    textInput: {
        height: 50,
        marginHorizontal: 5,
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.grey6,
        backgroundColor: colors.grey6,
        fontSize: 15,
    },
    textInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.grey6,
        marginHorizontal: 10,
        borderRadius: 10,
    },
}
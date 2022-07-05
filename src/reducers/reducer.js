
export const currentLocationReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_CURRENT_LOCATION":
            return {
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                address: action.payload.address,
                name: action.payload.name,
            };
        default:
            return state;
    }
}

export const destinationLocationReducer = (state = null, action) => {
    switch (action.type) {
        case "SET_DESTINATION_LOCATION":
            return {
                latitude: action.payload.latitude,
                longitude: action.payload.longitude,
                address: action.payload.address,
                name: action.payload.name,
            };
        default:
            return state;
    }
}
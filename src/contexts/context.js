import React, { createContext, useReducer } from "react";
import { currentLocationReducer, destinationLocationReducer } from "../reducers/reducer";

export const CurrentLocationContext = createContext();
export const DestinationLocationContext = createContext();


export const CurrentLocationContextProvider = ({ children }) => {
    const [currentLocation, currentLocationDispatch] = useReducer(currentLocationReducer, {
        latitude: null,
        longitude: null,
        address: null,
        name: null,
    });
    return (
        <CurrentLocationContext.Provider
            value={{ currentLocation, currentLocationDispatch }}>
            {children}
        </CurrentLocationContext.Provider>
    );
}

export const DestinationLocationContextProvider = ({ children }) => {
    const [destinationLocation, destinationLocationDispatch] = useReducer(destinationLocationReducer, {
        latitude: null,
        longitude: null,
        address: null,
        name: null,
    });
    return (
        <DestinationLocationContext.Provider
            value={{ destinationLocation, destinationLocationDispatch }}>
            {children}
        </DestinationLocationContext.Provider>
    );
}
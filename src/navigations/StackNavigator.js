import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import RequestScreen from '../screens/RequestScreen';
import DestinationScreen from '../screens/DestinationScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Request"
                component={RequestScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Destination"
                component={DestinationScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}   
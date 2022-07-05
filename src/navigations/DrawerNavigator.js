import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStack from "./StackNavigator";
import { Icon } from "react-native-elements";
import { colors } from "../global/styles";

const Drawer = createDrawerNavigator();


export default function DrawerNavigator() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    title: "Home",
                    headerShown: false,
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            name="home"
                            type="material-community"
                            size={size}
                            color={focused ? "#7cc" : colors.grey2}
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    );
}

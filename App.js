import React, { useEffect, useState } from 'react';
import {
    Image,
    TouchableOpacity
} from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import * as Font from 'expo-font';

// screens
import { Onboarding, DestinationDetail } from "./screens/";
// extra screens
import Tabs from "./navigation/tabs";

import { icons, COLORS, SIZES } from './constants';


const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        border: "transparent",
    },
};

const Stack = createStackNavigator();

const App = () => {

    const [fontLoaded, setFontLoaded] = useState(false);

    useEffect(() => {
        // Load the custom font asynchronously
        const loadFont = async () => {
          await Font.loadAsync({
            'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
            'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
            'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
            // Add more custom fonts here if needed
          });
          setFontLoaded(true);
        };
    
        loadFont();
      }, []);

      if (!fontLoaded) {
        // Return a loading screen or null while the font is loading
        return null;
      }

    return (
        <NavigationContainer theme={theme}>
            <Stack.Navigator
                initialRouteName={'Onboarding'}
            >
                {/* Screens */}
                <Stack.Screen
                    name="Onboarding"
                    component={Onboarding}
                    options={{
                        title: null,
                        headerStyle: {
                            backgroundColor: COLORS.white
                        },
                        headerLeft: null,
                        headerRight: () => (
                            <TouchableOpacity
                                style={{ marginRight: SIZES.padding }}
                                onPress={() => console.log("Pressed")}
                            >
                                <Image
                                    source={icons.barMenu}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />

                <Stack.Screen
                    name="DestinationDetail"
                    component={DestinationDetail}
                    options={{ headerShown: false }}
                />

                {/* Tabs */}
                < Stack.Screen
                    name="Home"
                    component={Tabs}
                    options={{
                        title: null,
                        headerStyle: {
                            backgroundColor: COLORS.white
                        },
                        headerLeft: ({ onPress }) => (
                            <TouchableOpacity
                                style={{ marginLeft: SIZES.padding }}
                                onPress={onPress}
                            >
                                <Image
                                    source={icons.back}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity
                                style={{ marginRight: SIZES.padding }}
                                onPress={() => console.log("Menu")}
                            >
                                <Image
                                    source={icons.menu}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25,
                                    }}
                                />
                            </TouchableOpacity>
                        ),
                    }}
                />


            </Stack.Navigator>
        </NavigationContainer >
    );
};

export default () => {
    return <App />;
};

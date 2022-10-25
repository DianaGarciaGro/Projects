import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'; 
import Map from './Map';
import MyPlaces from './MyPlaces';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const stack = createNativeStackNavigator();

export default function MyPlaces2() {
    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <stack.Navigator>
                    <stack.Screen name="MyPlaces" component={MyPlaces} />
                    <stack.Screen name="Map" component={Map} />
                </stack.Navigator>
            </SafeAreaProvider>
        </NavigationContainer>
    );
}
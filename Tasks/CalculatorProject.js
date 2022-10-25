import {FontAwesome5} from '@expo/vector-icons';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import HistoryScreen from './HistoryScreen'

const Stack = createNativeStackNavigator();

const screenOptions = ({ route }) => ({
    tabBarIcon: ({color, size}) => {
        let iconName;

    if (FontAwesome5 === 'home') {
        iconName ='home',
        size = 24,
        color = "black";
    } else if (FontAwesome5 === 'history') {
        iconName ='history'
        size = 24,
        color = "black";
    }

    return <FontAwesome5/>;
    }
});

export default function Calculator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions}> 
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="History" component={HistoryScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
import MapView, {Callout, Circle, Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button, TextInput, Alert } from 'react-native';

export default function Map() {
    const [keyword, setKeyword] = useState('');
    const [location, setLocation] = useState({lat: 0,
        lng: 0});

    const fetchRepositories = () => {
        fetch('http://www.mapquestapi.com/geocoding/v1/address?key=aomkOzGemfoiGmDrnpSnyLOfZaAn522x&location=' + keyword + '+Finland')
        .then(response => response.json())
        .then(location => setLocation(location.results[0].locations[0].latLng))
        .catch(error => Alert.alert('Error', error))
    }

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert ('No permission to get location');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation({lat: location.coords.latitude, lng: location.coords.longitude});
        })();
    }, []);

    console.log (location);

    return (
    <View style={{flex: 1}}>
        <View style={{flex: 10}}>
            <MapView 
                style={{flex: 1}}
                    region={{
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221
                }}>
                <Marker
                    coordinate={{latitude: location.lat, longitude: location.lng}}
                        draggable={true}
                        onDragStart={(e) => {
                            console.log("Drag start", e.nativeEvent.coordinates)
                        }}
                        onDragEnd={(e) => {
                            setLocation ({
                                latitude: e.nativeEvent.coordinate.latitude,
                                longitude: e.nativeEvent.coordinate.longitude
                            })
                        }}
                >
                    <Callout>
                        <Text>You're here</Text>
                    </Callout>
                </Marker>
                <Circle center={{latitude: location.lat, longitude: location.lng}} radius={500}/>
            </MapView>
        </View>
            <View style={styles.containerRow}>
                <TextInput 
                    style = {{width: 250, height: 40, borderWidth: 0.5}}
                    placeholder = 'Location...'
                    onChangeText = {Text => setKeyword(Text)}/>
                <Button 
                    title='Show' 
                    onPress={fetchRepositories} />
            </View>
    </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 30,
      backgroundColor: '#fff',
      alignContent: 'center',
    },
    containerRow: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
  });
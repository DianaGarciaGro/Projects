import MapView, {Marker} from 'react-native-maps';
import React, { useEffect, useState } from "react";
import { View, Alert } from 'react-native';

export default function Map({route}) {
    const {data} = route.params;
    const [location, setLocation] = useState({lat: 0, lng: 0});

    const fetchData = () => {
        fetch('http://www.mapquestapi.com/geocoding/v1/address?key=aomkOzGemfoiGmDrnpSnyLOfZaAn522x&location=' + data + '+Finland')
        .then(response => response.json())
        .then(data => setLocation(data.results[0].locations[0].latLng))
        .catch(error => {Alert.alert('Error', error);
        });
    }

    useEffect(() => fetchData(), []);

    return (
    <View style={{flex: 1}}>        
        <View style={{flex: 10}}>
            <MapView 
                style={{flex: 1}}
                    region={{
                    latitude: location.lat,
                    longitude: location.lng,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221}}>
                <Marker
                    coordinate={{latitude: location.lat,
                                longitude: location.lng}}/>
            </MapView>
        </View>
    </View>
    );
}
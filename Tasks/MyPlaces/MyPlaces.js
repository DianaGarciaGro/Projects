import { StyleSheet, FlatList, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';
import { Header, Input, Button, ListItem } from 'react-native-elements';

export default function MyPlaces({navigation}) {
  const [location, setLocation] = useState('');
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState([]);

  const firebaseConfig = {
    apiKey: "AIzaSyDQ_o0IxfqS46ZTAQpiFqwYn6b5VMviFFA",
    authDomain: "shoppinglist-a3606.firebaseapp.com",
    databaseURL: "https://shoppinglist-a3606-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "shoppinglist-a3606",
    storageBucket: "shoppinglist-a3606.appspot.com",
    messagingSenderId: "182513986557",
    appId: "1:182513986557:web:7cb25750666c3722e6c794",
    measurementId: "G-45BWTL2HJH"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

useEffect(() => {
    onValue(ref(database, 'location/'), (snapshot) => {
        const data = snapshot.val();
        if (!data) {
            setItems([]);
            setIndex([]);}
        else {
            setItems(Object.values(data));
            setIndex(Object.keys(data));
        }
    })},
    []);

const saveItem = () => {
    push(
        ref(database, 'location/'),
        { 'location': location });
}
    
const deleteId = (id) => {
    const deleteId = index[id];
    remove(
        ref(database, `location/${deleteId}`));
}
    
const listSeparator = () => {
    return (
        <View
            style={{
                height: 5,
                width: "100%",
                backgroundColor: "#CED0CE",
            }}
        />
    );
}

    renderItem= ({item, index}) => (
        <ListItem 
            onPress={() => navigation.navigate('Map', {data: item.location})}
            onLongPress={() => deleteId(index)} bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{item.location}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Subtitle style={styles.textbox}>Show on map</ListItem.Subtitle>
            <ListItem.Chevron />
        </ListItem>)

  return (
    <View style={styles.container}>
        <Input
            placeholder='Type in address'
            label='PLACEFINDER' 
            onChangeText={text => setLocation(text)}
        />
        <Button
            raised icon={{name: 'save'}}
            onPress={saveItem}
            title="Save" />

        <FlatList style={styles.Icon}
            keyExtractor={(item, index) => index.toString()}
            data={items}
            renderItem={renderItem}
            ItemSeparatorComponent={listSeparator}
        /> 
    </View>
  );
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
},
listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff'
},
title: {
    marginTop: 30, 
    fontSize: 18, 
    width: 200,
    justifyContent: 'center'
},
textbox: {
    fontSize: 12,
    color: 'gray',
    alignContent: 'flex-end'
},
Image: {
    flex: 1, 
    width: 500,
    height: 90,
    resizeMode: 'contain',
    alignItems: 'center'
},
Icon: {
    flexDirection: 'row'
}
});

/*
<View style={styles.Icon}>
                <Icon
                        type="material"
                        name="delete"
                        color="red"
                        onPress={() => deleteId(index)}
                    />
                <Icon
                    type="FontAwesome"
                    name="chevron-right"
                    color="gray"
                    onPress={() => navigation.navigate('Map')}/>
                </View>
*/
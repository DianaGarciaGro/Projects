import { StyleSheet, Text, FlatList, View, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';
import { Header, Icon, Input, Button, ListItem } from 'react-native-elements';

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

export default function SLElements() {
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState([]);

useEffect(() => {
    onValue(ref(database, 'data/'), (snapshot) => {
        const data = snapshot.val();
        const keys = Object.keys(data);
        const dataWithKeys = Object.values(data);
        if (!data) {
            setItems([]);
            setIndex([]);}
        else {
            setItems(dataWithKeys);
            setIndex(keys);
        }
    })},
    []);

  const saveItem = () => {
    push(    
        ref(database, 'data/'),     
        { 'product': product, 'amount': amount });
}

const deleteId = (id) => {
    const deleteId = index[id];
    remove(    
        ref(database, `data/${deleteId}`));
}

const listSeparator = () => {
    return (
        <View
            style={{
            height: 5,
            width: "80%",
            backgroundColor: "#fff",
            marginLeft: "10%"
            }}
        />
    );
};

  return (
    <View style={styles.container}>
        <Header
            centerComponent= {{ text: 'SHOPPING LIST', style: { color: '#fff' } }}
        />

        <Input
            placeholder='Type your product'
            label='PRODUCT' 
            onChangeText={product => setProduct(product)}
            value={product} 
        />
        <Input
            placeholder='Type the amount'
            label='AMOUNT' 
            onChangeText={amount => setAmount(amount)}
            value={amount} 
        />
        <Button
            raised icon={{name: 'save'}}
            onPress={saveItem}
            title="Save" />

        <Text style={styles.title}>Shopping List</Text>

        <FlatList style={styles.Icon}
            keyExtractor={(index) => index.toString()}
            data={items}
            renderItem={({item, index}) =>
                <ListItem bottomDivider>
                    <ListItem.Content>
                    <View style={styles.Icon}>
                        <ListItem.Title>{item.product}</ListItem.Title>
                        <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
                            <Icon
                                type="material"
                                name="delete"
                                color="red"
                                onPress={() => deleteId(index)}
                            />
                        </View>
                    </ListItem.Content>
                </ListItem>
                }
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
    marginTop: 5,
    marginBottom: 5,
    fontSize:18,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
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
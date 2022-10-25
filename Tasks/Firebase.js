import { StyleSheet, Text, Button, FlatList, View, Image, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import { initializeApp } from'firebase/app';
import { getDatabase, push, ref, onValue, remove } from'firebase/database';

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

export default function ShoppingListFirebase() {
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
        <Image style ={styles.Image} 
          source = {{uri: 'https://www.sttinfo.fi/data/images/00816/5b5ec726-9f04-4277-9a06-ce2f2b1aeed2.png/social'}} />

        <TextInput style={styles.textbox}
            placeholder='Product'
            onChangeText={text => setProduct(text)}
            value={product}/>
        <TextInput style={styles.textbox}
            placeholder='Amount'
            keyboardType='numeric'
            onChangeText={text => setAmount(text)}
            value={amount}/>

        <Button
            onPress={saveItem}
            title="Save" />

        <Text style={styles.title}>Shopping List</Text>

        <FlatList style={{marginLeft : "5%"}}
            keyExtractor={(index) => index.toString()}
            data={items}
            renderItem={({item, index}) =>
                <View style={styles.listcontainer}>
                    <Text style={{fontSize: 18}}>
                        Product: {item.product} {'\n'}
                        Amount: {item.amount}
                    </Text>
                    <Text
                    style={{color: '#0000ff'}}
                    onPress={() => deleteId(index)}>
                        Delete</Text>
                </View>}

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
    backgroundColor: '#fff',
    alignItems: 'center'
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
}
});
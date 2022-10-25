import { StyleSheet, Text, Button, FlatList, View, Image, Alert, TextInput} from 'react-native';
import React, {useState, useEffect} from 'react';
import * as SQLite from'expo-sqlite';

export default function ShoppingListSQL() {
  const [amount, setAmount] = useState('');
  const [product, setProduct] = useState('');
  const [data, setData] = useState([]);

  const db = SQLite.openDatabase('product.db');

  useEffect(() => {
    db.transaction(tx => {
        tx.executeSql('create table if not exists productdb (id integer primary key not null, amount int, product text);');
    }, null, updateList);
  }, []);

const saveItem = () => {
    db.transaction(tx => {
        tx.executeSql(`insert into productdb (amount, product) values (?, ?);`,
            [parseInt(amount), product]);
    }, null, updateList)
}

const updateList = () => {
    db.transaction(tx => {
        tx.executeSql('select * from productdb;', [], (_, { rows }) =>
            setData(rows._array)
            );
    }, null, null);
}

const deleteItem = (id) => {
    db.transaction(tx => {
        tx.executeSql('delete from productdb where id = ?;', [id]);
    }, null, updateList)
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
        <FlatList
            style={{marginLeft : "5%"}}
            keyExtractor={(item, index) => item.toString()}   
            renderItem={({item}) =>
                <View style={styles.listcontainer}>
                    <Text style={{fontSize: 18}}>
                        {item.product},{item.amount}
                    </Text>
                    <Text style={{color: '#0000ff'}} onPress={() => deleteItem(item.id)}>
                        Bought</Text>
                </View>}
            data={data}
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
import { StyleSheet, Text, Button, View, FlatList, remove, ref, database } from 'react-native';
import React, { useState } from 'react';
import * as Contacts from 'expo-contacts';

export default function Contact() {
const [contact, setContact] = useState({});

const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync(  
            );   
        if (data.length > 0) {
            setContact(data);
        }
    }
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

return(
    <View style={styles.container}>
        <View style={{flex:1 }}>
            <View style={styles.container}>
                <Button title="Get Contact" onPress={getContacts} />
            </View>
            <FlatList style={{marginLeft : "5%"}}
                keyExtractor={(item, index) => index.toString()}   
                data={contact}
                renderItem={({item}) =>
                <View style={styles.listcontainer}>
                    {item.phoneNumbers !=null && (
                    <Text>
                        Name: {item.name} {"\n"}
                        Number: {item.phoneNumbers[0].number}
                    </Text>
                    )}
                </View>}
            ItemSeparatorComponent={listSeparator}/>
        </View>    
    </View>
    );
}

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
    }
});
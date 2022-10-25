import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, Button, FlatList, View, Image, TextInput} from 'react-native';
import React, {useState} from 'react';

export default function App() {
  const [item, setitem] = useState('');
  const [selectedId] = useState ();
  const [data, setData] = useState([]);

  const add = () => {
    setData ([...data, {key: item}]),
    setitem('')
  };

  const clean = () => {
    setData ('')
  };

  return (
    <View style={styles.container}>
      <Image style ={styles.Image} 
        source = {{uri: 'https://www.sttinfo.fi/data/images/00816/5b5ec726-9f04-4277-9a06-ce2f2b1aeed2.png/social'}} />
      <Text style= {styles.baseText}> Add your item:</Text>
      <TextInput keyboardType='text'
        style = {{width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={Text => setitem(Text)} value={item}/>
        <StatusBar style="auto" />
      <View style={styles.containerRow}>
        <Button title= " Clean " onPress={clean}/>
        <Button title= " Add " onPress={add}/>
      </View>
      <Text style= {styles.titleText}> Shopping List: </Text>
      <SafeAreaView style={styles.container}>
        <FlatList 
          data ={data}
          renderItem ={({item}) => 
            <Text style={styles.baseText}> {item.key} </Text>}
          keyExtract = {(item, index) => index.toString()}
          extraData={selectedId}
        />
      </SafeAreaView>
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
  containerRow: {
    flex: 1,
    width: 190,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20
  },
  Image: {
    flex: 1, 
    width: 500,
    height: 90,
    resizeMode: 'contain',
    alignItems: 'center'
  },
  baseText: {
    fontSize: 15,
    fontFamily: "serif"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
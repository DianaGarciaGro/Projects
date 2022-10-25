import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, Button, FlatList, View, Image, TextInput} from 'react-native';
import React, {useState} from 'react';

export default function CalculatorHistory() {
  const [N1, setN1] = useState('');
  const [N2, setN2] = useState('');
  const [result, setResult, selectedId] = useState ();
  const [item, setitem, Number] = useState('');
  const [data, setData] = useState([]);

  const add = () => {
    setResult(parseInt(N1) + parseInt(N2)),
    setData([...data, {key: item}]),
    setitem(`${N1} + ${N2} = ${result}`)
  };
  const sub = () => {
    setResult(parseInt(N1) - parseInt(N2)),
    setData([...data, {key: Number}]),
    setitem(`${N1} - ${N2} = ${result}`)
  };

  return (
    <View style={styles.container}>
      <Image style ={styles.Image} 
        source = {{uri: 'https://www.sttinfo.fi/data/images/00816/5b5ec726-9f04-4277-9a06-ce2f2b1aeed2.png/social'}} />
      <Text style= {styles.baseText}> First number:</Text>
      <TextInput keyboardType='numeric'
        style = {{width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={Text => setN1(Text)}/>
      <Text style= {styles.baseText}> Second number:</Text>
      <TextInput keyboardType='numeric'
        style = {{width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={Text => setN2(Text)}/>
      <Text style={styles.baseText}/>
        <Text style={styles.titleText}>
         Result: {result}
        </Text>
        <StatusBar style="auto" />
      <View style={styles.containerRow}>
        <Button title= "  +  " onPress={add}/>
        <Button title= "  -  " onPress={sub}/>
      </View>
      <Text style= {styles.titleText}> History: </Text>
      <SafeAreaView style={styles.container}>
        <FlatList 
          data ={data}
          renderItem ={({item}) => 
            <Text style={styles.baseText}> {item.key} </Text>}
          renderNumber ={({Number}) => 
            <Text style={styles.baseText}> {Number.key} </Text>}
          keyExtract = {(index) => index.toString()}
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
    width: 150,
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
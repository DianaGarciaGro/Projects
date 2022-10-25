import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Image, TextInput} from 'react-native';
import React, {useState} from 'react';

export default function Calculator() {
  const [N1, setN1, setText] = useState('');
  const [N2, setN2] = useState ('');
  const [result, setResult] = useState ();

  const add = () => {setResult(parseInt(N1) + parseInt(N2))};
  const sub = () => {setResult(parseInt(N1) - parseInt(N2))};

  return (
    <View style={styles.container}>
      <Image style ={styles.Image} 
        source = {{uri: 'https://www.sttinfo.fi/data/images/00816/5b5ec726-9f04-4277-9a06-ce2f2b1aeed2.png/social'}} />
      <TextInput keyboardType='numeric'
        style = {{width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={Text => setN1(Text)}/>
      <TextInput keyboardType='numeric'
        style = {{width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={Text => setN2(Text)}/>
      <Text style={styles.baseText}/>
        <Text style={styles.titleText}>
         Result: {result}
        </Text>
        <StatusBar style="auto" />
      <View style={styles.containerRow}>
        <Button title= "+" onPress={add}/>
        <Button title= "-" onPress={sub}/>
      </View>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Image: {
    flex: 1, 
    width: 500,
    height: 90,
    resizeMode: 'contain',
    alignItems: 'center'
  },
  baseText: {
    fontFamily: "serif"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  }
});
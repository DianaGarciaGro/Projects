import * as React from 'react';
import {useState} from 'react';
import { View, StyleSheet, Button, Text, TextInput, Image } from 'react-native';
import * as Speech from 'expo-speech';

function TextToSpeech() {
  const [thingToSay, setToSay] = useState('');

  const speak = () => {
    Speech.speak(thingToSay);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={{fontSize: 18, borderWidth: 1, borderColor: 1}}
        multiline={true}
        placeholder='Write something...'
        onChangeText={text => setToSay(text)}/>
      <Button 
        title='Press to hear'
        onPress={speak}/>
    </View>
  );
}
export default TextToSpeech;

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
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert} from 'react-native';
import React, {useState} from 'react';

let generated = Math.floor(Math.random() * 100) + 1;

export default function NumberGuessing() {
  const [guess, setGuess] = useState('');
  const [times, setTimes] = useState(1);
  const [text, setText] = useState("Let's guess a number from 1-100, what's your first guess?");

  const makeGuess =()=>{ 
    setTimes(times+1);

    if(generated == guess){ Alert.alert(`You guessed the number in ${times} guesses`);
    setText(`You guessed the secret number! The secret number was ${generated}`);
    setTimes(1);}
    else if (generated < guess){ setText(`Your guess ${guess} is too high`)}
    else if (generated > guess){ setText(`Your guess ${guess} is too low`)}
  }

  const NG = () => {
    generated = Math.floor(Math.random() * 100) + 1;
    setTimes (times + 1);
    setText ("Let's guess a number from 1-100, what's your first guess?")
  }
  
  return (
    <View style={styles.container}>
      <Image style ={styles.Image} source = {{uri: 'https://www.sttinfo.fi/data/images/00816/5b5ec726-9f04-4277-9a06-ce2f2b1aeed2.png/social'}} />
      <Text>{text}</Text>
      <TextInput keyboardType='numeric'
        style = {{width: 200, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => setGuess(text)}/>
      <View style={styles.containerRow}>
        <Button title= "New Game" onPress={NG}/>
        <Button title="Make a Guess" onPress={makeGuess}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  Image: {
    flex: 1, 
    width: 500,
    height: 90,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
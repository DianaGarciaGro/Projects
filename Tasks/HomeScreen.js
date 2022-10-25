import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Image, TextInput} from 'react-native';
import React, {useState} from 'react';

export default function HomeScreen({ navigation }) {
    const [N1, setN1] = useState('');
    const [N2, setN2] = useState('');
    const [result, setResult] = useState ();
    const [data, setData] = useState([]);
  
    const add = () => {
      const add = parseInt(N1) + parseInt(N2);
      setResult(add);
      setData([...data, {key: `${N1} + ${N2} = ${add}`}]);
    };
    const sub = () => {
      const sub = parseInt(N1) - parseInt(N2);
      setResult(sub);
      setData([...data, {key: `${N1} - ${N2} = ${sub}`}]);
    };
  
      return(
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
              <View style={styles.containerRow2}>
                <Button title= " History " onPress={() => navigation.navigate ('History', {data:data})}/>
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
      width: 150,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5
    },
    containerRow2: {
      flex: 1,
      width: 100,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
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
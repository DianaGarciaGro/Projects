import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, Button, Image, Alert, FlatList } from 'react-native';
import { Feather} from "@expo/vector-icons";

export default function RecipeFinder() {
  const [keyword, setKeyword] = useState('');
  const [data, setData] = useState([]);

  const fetchRepositories = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=' + keyword)
    .then(response => response.json())
    .then(data => setData(data.meals))
    .catch(error => Alert.alert('Error', error))
  }
  const ItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };


  return (
    <View style={styles.container}>
      <FlatList 
        data={data}
        renderItem ={({item}) =>
          <View style= {{margin: 10}}> 
            <Text style={{fontSize: 18, fontWeight: 'bold'}}> {item.strMeal} </Text>
            <Image 
            style={styles.Image}
            source={{uri: item.strMealThumb}}/>
          </View>}
        ItemSeparatorComponent={ItemSeparator}
      />
        <View style = {styles.searchBar_Press}>
          <Feather
            name = "search"
            size = {20}
            color = "black"
            style={{marginLeft: 1}}
          />
          <TextInput
            style={{fontSize: 18}}
            placeholder='Keyword'
            onChangeText={text => setKeyword(text)}
          />
        </View>
        <Button 
          title='Search'
          onPress={fetchRepositories}
        />
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar_Press: {
    padding: 10,
    flexDirection: "row",
    marginLeft: 15,
    width: "60%",
    height: 45,
    backgroundColor: "#d9dbda",
    justifyContent: "space-evenly",
  },
  container2: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 1
  },
  Image: {
    height: 70,
    width: 70,
    borderRadius:4
  }
});
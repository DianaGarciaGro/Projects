import { StyleSheet, SafeAreaView, FlatList, View, Text } from 'react-native';

export default function HistoryScreen({ route, navigation }) {
  const{data} = route.params;  
  return (
      <View>
        <Text style= {styles.titleText}> History: </Text>
          <FlatList 
            data ={data}
            renderItem ={({item}) => 
              <Text style={styles.baseText}> {item.key} </Text>}
              keyExtractor = {(item, index) => index.toString()}
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
    titleText: {
      fontSize: 20,
      fontWeight: "bold"
    }
  });
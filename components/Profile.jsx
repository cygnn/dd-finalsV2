import { Text, View,Image,SafeAreaView, StyleSheet, Button,TextInput,TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import {useEffect, useState, useCallback} from 'react'

import { useFocusEffect } from '@react-navigation/native';

export default function Profile({navigation}){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([])
  

  const handleEdit = (item)=> {
    navigation.navigate("Edit", {username: item.username, existingPhoto: item.photo, userId : item.id})
  }
  useFocusEffect(useCallback(() => {
    const getUsers = async () => {
      try{
        setLoading(true);
        const response = await fetch('https://dd-backend-ikt5.onrender.com/users');
        console.log(response);
        if (response.ok){
          const data = await response.json();
          console.log(data)
          setData(data);
          setUsers(data);
        }
        else{
          console.error('Error fetching users: ', response.status)
        }
      }
      catch(error){
        console.error('Network error: ', error);
      }
      finally{
        setLoading(false);
      }
    }
    
    getUsers();
  }, []))
  
  const handleSearch = (name) => {
    const filteredData = users.filter((word) =>
      word.username.toLowerCase().includes(name.toLowerCase())
    );
    setData(filteredData);
  }
  return(
    <View style={{position: 'relative', flex: 1}}>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <View>
        <TextInput style={styles.searchInput} onChangeText={handleSearch} placeholder='Search...' />
      </View>
    <FlatList
      style={styles.flatList}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => {
        return(
          <TouchableOpacity style={{flexDirection: 'row', marginLeft: 24, borderBottomWidth: 2, paddingBottom: 16, paddingTop: 8, justifyContent: 'space-between'}} onPress={()=> handleEdit(item)}>
              <View>
                <Image
                  style={styles.tinyLogo} 
                  source={{ uri: item.photo }}
                />
              </View>
              <View style={{justifyContent: 'center' , marginLeft: 32, }}>
                <Text>{item.username}</Text>
              </View>
              {/*ADDED THIS BUTTON INCASE HEADER RIGHT WONT WORK || JUST REMOVE */}
              <Button title='Go to add' onPress={()=> {console.log('IN PROFILE'); navigation.navigate('Add')}}/>
          </TouchableOpacity>
        )
      }}
    />
    </View>
  )
}
const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  flatList: {
    marginVertical: 8,
    padding: 16,
    minHeight: '80%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, // Make sure overlay is on top of other content
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 10,
    marginTop: 8,
    marginHorizontal: 8,
    fontSize: 16,
  },
})
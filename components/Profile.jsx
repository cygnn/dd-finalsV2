import { Text, View,Image,SafeAreaView, StyleSheet, Button,TextInput,TouchableOpacity, FlatList } from 'react-native';
import {useEffect, useState} from 'react'

export default function Profile({navigation}){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleEdit = (item)=> {
    navigation.navigate("Edit", {username: item.username, existingPhoto: item.photo})
  }

  useEffect(() => {
    const getUsers = async () => {
      try{
        const response = await fetch('https://dd-backend-ikt5.onrender.com/users');
        console.log(response);
        if (response.ok){
          const data = await response.json();
          console.log(data)
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
  }, [])

  return(
    <FlatList
      style={styles.flatList}
      data={users}
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
              <Button title='Go to add' onPress={()=> {console.log('IN PROFILE'); navigation.navigate('Add')}}/>
          </TouchableOpacity>
        )
      }}
    />
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
    height: '80%',
  },
})
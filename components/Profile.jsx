import { Text, View,Image,SafeAreaView, StyleSheet, Button,TextInput,TouchableOpacity } from 'react-native';
import {useState} from 'react'

export default function Profile({navigation}){
  return(
    <TouchableOpacity style={{flexDirection: 'row', marginLeft: 24, borderBottomWidth: 2,     paddingBottom: 16, paddingTop: 8,}}>
      <View>
        <Image
          style={styles.tinyLogo} 
          source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr7G2RLx0UJDceECwLZSPcRcpJIFwLKYQgZw&s'}}
        />
      </View>
      <View style={{justifyContent: 'center' , marginLeft: 32, }}>
        <Text>tidert2024@gmail.com</Text>
      </View>
      <Button title='Go to add' onPress={()=> {console.log('IN PROFILE'); navigation.navigate('Add')}}/>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
})
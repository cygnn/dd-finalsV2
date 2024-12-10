import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { PhotoContext } from '../context/photoContext';
import blank from '../assets/blank.png'

export default function Add({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  const [photo, setPhoto] = useState(null)


  useEffect(()=>{
  },[photo])

  const handleSave = async ()=> {
    if (!email || !password || !newPassword || !photo) {
      alert('Please fill all fields');
      return;
    }

    if (password !== newPassword) {
      alert('Passwords do not match');
      return;
    }

    const user ={
      username: email,
      password: password,
      photo: photo
    }

    console.log(user);
    
    
    const formData = new FormData();
    formData.append('photo', {
      uri: photo,
      type: "image/jpeg",
      name: "image.jpg"
    })
    formData.append('username', email);
    formData.append('password', password);
    //NOT TESTED YET
    try {
      const response = await fetch('https://dd-backend-ikt5.onrender.com/add-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'Multipart/form-data',
        },
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('User added successfully:', result);
        alert('User added successfully!');
        navigation.goBack();
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('An error occurred. Please try again.');
    }
  }

  const handleCancel = ()=> {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 16 }}>
            <TouchableOpacity
              style={{ width: 120, height: 120, borderRadius: 90 }}
              onPress={() => navigation.navigate('Camera', { setPhoto })}
            >
              <Image style={styles.imageContainer} source={photo ? { uri: photo } : blank} />
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <Text style={styles.text}>Email</Text>
            <TextInput
              onChangeText={setEmail}
              value={email}
              placeholderTextColor="#718096"
              style={styles.input}
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              onChangeText={setPassword}
              secureTextEntry={true}
              value={password}
              placeholderTextColor="#718096"
              style={styles.input}
            />
            <Text style={styles.text}>Confirm Password</Text>
            <TextInput
              onChangeText={setNewPassword}
              secureTextEntry={true}
              value={newPassword}
              placeholderTextColor="#718096"
              style={styles.input}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 }}>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  imageContainer:{
    width: 120, 
    height: 120, 
    borderRadius: 90
  },
  text: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
  },
  form: {
    width: '100%',
    padding: 16,
  },
  saveButton: {
    width: 100,
    backgroundColor: 'green',
    alignItems: 'center',
    padding: 8,
  },
  cancelButton: {
    width: 100,
    backgroundColor: 'red',
    alignItems: 'center',
    padding: 8,
  },
});

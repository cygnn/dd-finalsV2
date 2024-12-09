import React, { useState, useEffect, useRef, useContext } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Button } from 'react-native';

export default function Edit({navigation, route}){
    const {username, existingPhoto} = route.params

    const [email, setEmail] = useState(username);
    const [password, setPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);
    const [photo, setPhoto] = useState(existingPhoto)


    useEffect(()=> {
        console.log('The photo is : ' + photo)
    })

    const handleSave = async ()=> {
        if (!email || !password || !newPassword) {
            alert('Please fill all fields');
            return;
        }
      
        if (password !== newPassword) {
            alert('Passwords do not match');
            return;
        }

        const updatedUser = {
            username: email,
            password: password,
            photo: photo,
        };

        //NOT TESTED YET
        try {
            const response = await fetch(`https://dd-backend-ikt5.onrender.com/update-user/${username}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
    
            if (response.ok) {
                const result = await response.json();
                console.log('User updated successfully:', result);
                alert('User updated successfully!');
                navigation.navigate('Profile');
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
        navigation.navigate('Profile')
    }

    return(
        <View style={{ flex: 1 }}>
            <View>
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 16 }}>
                <TouchableOpacity
                style={{ width: 120, height: 120, borderRadius: 90 }}
                onPress={() => navigation.navigate('Camera',{ setPhoto })}
                >
                    {/*TEMPORARY IMAGE SRC/SOURCE */}
                {photo ? <Image style={{ width: 120, height: 120, borderRadius: 90 }} src={photo} source={{ uri: `data:image/jpg;base64,${photo.base64}` }}/> : (<Text>HELLLOOO</Text>)}
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
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>SAVE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>CANCEL</Text>
                </TouchableOpacity>
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
      marginTop: 24,
      fontSize: 16,
      fontWeight: 'bold',
    },
    input: {
      borderColor: 'black',
      borderWidth: 3,
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
  
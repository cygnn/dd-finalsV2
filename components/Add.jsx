import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image, Button } from 'react-native';
import { Camera, CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function Add({navigation}) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [newPassword, setNewPassword] = useState(null);
  return (
    <View style={{ flex: 1 }}>
        <View>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 16 }}>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', width: 120, height: 120, borderRadius: 90 }}
              onPress={() => navigation.navigate('Camera')}
            >
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
              value={password}
              placeholderTextColor="#718096"
              style={styles.input}
            />
            <Text style={styles.text}>Confirm Password</Text>
            <TextInput
              onChangeText={setNewPassword}
              value={newPassword}
              placeholderTextColor="#718096"
              style={styles.input}
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>SAVE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
    </View>
  );
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

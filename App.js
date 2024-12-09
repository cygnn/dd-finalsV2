import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';
import Add from './components/Add.jsx';
import Goto from './components/Goto.jsx';
import CameraComp from './components/Camera.jsx'

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{
          title: 'PUNTANAR AND FAMILY',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: 'white',
        }}
        />
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={({ navigation }) => ({
          headerRight: () => (
            <Button title="Add" onPress={()=> {console.log('Header right'); navigation.navigate('Add')}} />
          ),
          title: "PUNTANAR AND FAMILY",
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: 'white',
        })}
      />
      <Stack.Screen 
        name="Add" 
        component={Add} 
        options={{
          title:'PUNTANAR AND FAMILY',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: 'white',
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={{
          title: 'PUNTANAR AND FAMILY',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: 'white',
        }}
        />
      <Stack.Screen 
        name="Profile" 
        component={Profile}
        options={({ navigation }) => ({
          headerRight: () => (
            <Goto navigation={navigation}/>
          ),
          title: "PUNT",
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: 'white',
        })}
      />
      <Stack.Screen 
        name="Add" 
        component={Add} 
        options={{
          title:'PUNTANAR AND FAMILY',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="Camera"
        component={CameraComp}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
}
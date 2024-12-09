import { Text, View,SafeAreaView, StyleSheet, Button,TextInput } from 'react-native';
import {useState} from 'react'

export default function Login({navigation}){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }
  
    try {
      const response = await fetch('https://dd-backend-ikt5.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });
  
      if (response.ok) {
        const user = await response.json();
        console.log('Login successful', user);
        // Navigate to the Profile page with the user's data
        navigation.navigate('Profile', { user });
      } else {
        const error = await response.json();
        alert(error.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return(
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.text}>Email</Text>
        <TextInput
                onChangeText={setEmail}
                value={email}
                placeholderTextColor={'#718096'}
                style={styles.input}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
                onChangeText={setPassword}
                value={password}
                placeholderTextColor={'#718096'}
                style={styles.input}
                secureTextEntry={true}
        />
      </View>
        <Button
          title="Login"
          onPress={handleLogin}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'around',
    backgroundColor: '#ecf0f1',
    padding: 0,
  },
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
  form:{
    width: '100%',
    padding: 16,
  },
});

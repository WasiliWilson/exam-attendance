<<<<<<< Updated upstream
// components/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleLogin = () => {
    if (!username || !password || !selectedType) {
      Alert.alert('Error', 'Please fill in all fields and select a type before logging in.');
    } else {
      Alert.alert('Success', `Logged in as ${username} (${selectedType}).`);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Redirect to forgot password screen.');
=======
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
//import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from './firebaseConfig'

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert('Success', `Welcome ${userCredential.user.email}`);
      })
      .catch((error) => {
        console.error(error.message);
        Alert.alert('Error', error.message);
      });
>>>>>>> Stashed changes
  };

  return (
    <View style={styles.container}>
<<<<<<< Updated upstream
      <Text style={styles.welcomeText}>WELCOME TO</Text>
      <Text style={styles.titleText}>EXAM</Text>

      <View style={styles.loginBox}>
        <Text style={styles.signInText}>SIGN IN TO START SESSION</Text>

        {/* Username Input */}
        <Text style={styles.fieldLabel}>Enter Username</Text>
        <TextInput
          placeholder="USERNAME"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#999"
        />

        {/* Password Input */}
        <Text style={styles.fieldLabel}>Enter Password</Text>
        <TextInput
          placeholder="PASSWORD"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry
        />

        {/* Select Type Picker */}
        <Text style={styles.fieldLabel}>Select Type</Text>
        <RNPickerSelect
          onValueChange={(value) => setSelectedType(value)}
          items={[
            { label: 'Invigilator', value: 'invigilator' },
            { label: 'Teacher', value: 'teacher' },
          ]}
          placeholder={{ label: 'SELECT TYPE', value: null }}
          style={{
            inputIOS: styles.picker,
            inputAndroid: styles.picker,
          }}
        />

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>FORGOT PASSWORD</Text>
        </TouchableOpacity>
      </View>
=======
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
>>>>>>> Stashed changes
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< Updated upstream
  container: {
    flex: 1,
    backgroundColor: '#d0e6f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 5,
  },
  loginBox: {
    backgroundColor: '#4a90e2',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    maxWidth: 350,
    marginTop: 20,
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 15,
    textAlign: 'center',
  },
  fieldLabel: {
    width: '100%',
    color: '#000', // Black color for labels
    fontSize: 14,
    marginBottom: 5,
    marginLeft: 5,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#003f88',
    paddingVertical: 10,
    borderRadius: 8,
    width: '47%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#f0f0f0',
    fontSize: 12,
    marginTop: 15,
    textDecorationLine: 'underline',
  },
=======
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: '80%', height: 40, borderWidth: 1, marginBottom: 10, padding: 10 },
  button: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
>>>>>>> Stashed changes
});

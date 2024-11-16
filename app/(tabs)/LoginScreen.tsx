// components/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';



export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleForgotPassword = () => {
    Alert.alert("Forgot Password", "Redirect to forgot password screen.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>WELCOME TO</Text>
      <Text style={styles.titleText}>EXAM</Text>

      <View style={styles.loginBox}>
        <Text style={styles.signInText}>SIGN IN TO START SESSION</Text>

        <TextInput
          placeholder="USERNAME"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="PASSWORD"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry
        />

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

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>FORGOT PASSWORD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});

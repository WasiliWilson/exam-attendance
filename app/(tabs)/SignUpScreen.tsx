// components/SignUpScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [department, setDepartment] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>SIGN UP</Text>

      <View style={styles.signupBox}>
        <Text style={styles.instructionText}>SIGN UP TO START SESSION</Text>

        <TextInput
          placeholder="EMAIL"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="USERNAME"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="DEPARTMENT"
          value={department}
          onChangeText={setDepartment}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="COURSE CODE"
          value={courseCode}
          onChangeText={setCourseCode}
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

        <TextInput
          placeholder="CONFIRM PASSWORD"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.buttonText}>SIGN UP</Text>
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
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  signupBox: {
    backgroundColor: '#4a90e2',
    padding: 20,
    borderRadius: 10,
    width: '85%',
    maxWidth: 350,
    alignItems: 'center',
  },
  instructionText: {
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
  signupButton: {
    backgroundColor: '#003f88',
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

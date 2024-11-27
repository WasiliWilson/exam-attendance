// components/SignUpScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Firebase function import
import { auth } from './firebaseConfig'; // Firebase config import

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [department, setDepartment] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    try {
      // Check for empty fields
      if (!email || !username || !department || !courseCode || !password || !confirmPassword) {
        Alert.alert('Error', 'All fields are required. Please fill them out.');
        return;
      }

      // Validate email format
      if (!validateEmail(email)) {
        Alert.alert('Error', 'Invalid email address. Please enter a valid email.');
        return;
      }

      // Check if passwords match
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match. Please re-enter.');
        return;
      }

      // Create a new user with Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Extract and display user information
      const user = userCredential.user;
      Alert.alert('Success', `Account successfully created for ${username} with email ${user.email}.`);

      // Optional: Reset the form after successful signup
      setEmail('');
      setUsername('');
      setDepartment('');
      setCourseCode('');
      setPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      console.error(error.message);

      // Handle Firebase-specific errors
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Error', 'This email is already in use.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'Invalid email format.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert('Error', 'Password must be at least 6 characters.');
      } else {
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>SIGN UP</Text>

      <View style={styles.signupBox}>
        <Text style={styles.instructionText}>SIGN UP TO START SESSION</Text>

        {/* Email Input */}
        <Text style={styles.fieldLabel}>Enter Email</Text>
        <TextInput
          placeholder="EMAIL"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#999"
          keyboardType="email-address"
        />

        {/* Username Input */}
        <Text style={styles.fieldLabel}>Enter Username</Text>
        <TextInput
          placeholder="USERNAME"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          placeholderTextColor="#999"
        />

        {/* Department Input */}
        <Text style={styles.fieldLabel}>Enter Department</Text>
        <TextInput
          placeholder="DEPARTMENT"
          value={department}
          onChangeText={setDepartment}
          style={styles.input}
          placeholderTextColor="#999"
        />

        {/* Course Code Input */}
        <Text style={styles.fieldLabel}>Enter Course Code</Text>
        <TextInput
          placeholder="COURSE CODE"
          value={courseCode}
          onChangeText={setCourseCode}
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

        {/* Confirm Password Input */}
        <Text style={styles.fieldLabel}>Confirm Password</Text>
        <TextInput
          placeholder="CONFIRM PASSWORD"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry
        />

        {/* Sign-Up Button */}
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0e6f5', // Light blue background
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
  fieldLabel: {
    width: '100%',
    color: '#000',
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

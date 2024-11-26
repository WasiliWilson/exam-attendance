<<<<<<< Updated upstream
// components/SignUpScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

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

  const handleSignUp = () => {
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

    // If all validations pass
    Alert.alert('Success', `Account successfully created for ${username}.`);
=======
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import the function
import { auth } from './firebaseConfig'; // Import the initialized auth instance

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      // Ensure email and password are not empty
      if (!email || !password) {
        Alert.alert('Error', 'Please provide both email and password.');
        return;
      }

      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Extract user data
      const user = userCredential.user;
      Alert.alert('Success', `Account created for ${user.email}`);
    } catch (error: any) {
      // Handle errors
      console.error(error.message);

      // Display user-friendly error messages
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
>>>>>>> Stashed changes
  };

  return (
    <View style={styles.container}>
<<<<<<< Updated upstream
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
=======
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
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
    color: '#000', // Changed to black
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
=======
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  input: { width: '80%', height: 40, borderWidth: 1, marginBottom: 10, padding: 10 },
  button: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
>>>>>>> Stashed changes
});

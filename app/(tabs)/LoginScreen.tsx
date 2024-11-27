import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { useRouter } from 'expo-router'; // Use useRouter for navigation

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const router = useRouter(); // Initialize useRouter for navigation

  const handleLogin = async () => {
    if (!email || !password || !selectedType) {
      Alert.alert('Error', 'Please fill in all fields and select a user type.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', `Welcome, ${userCredential.user.email} (${selectedType})!`);
      router.push('/(tabs)/CourseSelection'); // Navigate after successful login
    } catch (error: any) {
      console.error(error.message);
      // Friendly error handling
      if (error.code === 'auth/wrong-password') {
        Alert.alert('Error', 'Incorrect password. Please try again.');
      } else if (error.code === 'auth/user-not-found') {
        Alert.alert('Error', 'No user found with this email.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('Error', 'The email address is not valid.');
      } else {
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    }
  };

  const handleSignUpNavigation = () => {
    router.push('/(tabs)/SignUpScreen'); // Navigate to Sign Up screen
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Redirect to forgot password screen.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <Text style={styles.fieldLabel}>Enter Email</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor="#999"
      />

      {/* Password Input */}
      <Text style={styles.fieldLabel}>Enter Password</Text>
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        placeholderTextColor="#999"
      />

      {/* User Type Picker */}
      <Text style={styles.fieldLabel}>Select User Type</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedType(value)}
        items={[
          { label: 'Invigilator', value: 'invigilator' },
          { label: 'Teacher', value: 'teacher' },
        ]}
        placeholder={{ label: 'Select User Type', value: null }}
        style={{
          inputIOS: styles.picker,
          inputAndroid: styles.picker,
        }}
        value={selectedType} // Ensure binding to selectedType
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignUpNavigation}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d0e6f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003f88',
    marginBottom: 20,
  },
  fieldLabel: {
    width: '100%',
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  picker: {
    width: '100%',
    height: 40,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
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
    color: '#003f88',
    fontSize: 12,
    marginTop: 15,
    textDecorationLine: 'underline',
  },
});

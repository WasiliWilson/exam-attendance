import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Help: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<string>('');
  const navigation = useNavigation();

  const helpItems = [
    { question: 'How to navigate the app?', answer: 'Use the menu to access different sections of the app.' },
    { question: 'What is Course Selection?', answer: 'It allows you to view and manage your course schedule.' },
    { question: 'How to scan an ID?', answer: 'Go to the Invigilator Scan ID section and follow the instructions.' },
    { question: 'Where can I see attendance?', answer: 'Check the Attendance section for details.' },
    { question: 'How to contact support?', answer: 'Reach out via the Help section for support.' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', onPress: () => navigation.navigate('LoginScreen') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>HELP</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Help & FAQ Section */}
      <Text style={styles.title}>Help & FAQ</Text>
      <ScrollView style={styles.scrollContainer}>
        {helpItems.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Contact Admin Section */}
      <View style={styles.contactSection}>
        <Text style={styles.headerText}>CONTACT ADMIN FOR HELP</Text>
        <Image
          source={{ uri: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png' }}
          style={styles.gmailIcon}
        />
        <Text style={styles.emailText}>administrator@unima.ac.mw</Text>
        <Text style={styles.contactHeader}>CONTACT</Text>
        <Text style={styles.phoneText}>+265 990 990 90 / +265 889 889 00</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menuIcon: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  logoutButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  logoutButtonText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    textAlign: 'center',
    marginVertical: 16,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  answer: {
    fontSize: 16,
    color: '#6B7280',
  },
  contactSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  gmailIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 20,
  },
  contactHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phoneText: {
    fontSize: 16,
  },
});

export default Help;

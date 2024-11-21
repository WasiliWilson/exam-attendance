import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const HelpScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={styles.menuText}>&#9776;</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle}>HELP</Text>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text style={styles.headerText}>CONTACT ADMIN FOR HELP</Text>
        <Image
          source={{ uri: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png' }}
          style={styles.gmailIcon}
        />
        <Text style={styles.emailText}>administrator@unima.ac.mw</Text>
        <Text style={styles.contactHeader}>CONTACT</Text>
        <Text style={styles.phoneText}>+265 990 990 90 / +265 889 889 00</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E8F9',
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#5A7D9A',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuButton: {
    padding: 10,
  },
  menuText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  navTitle: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  logoutButton: {
    padding: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
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

export default HelpScreen;

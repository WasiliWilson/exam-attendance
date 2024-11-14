import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

const Menu: React.FC<{ onMenuItemPress: (screen: string) => void }> = ({ onMenuItemPress }) => {
  const menuItems = [
    { label: 'Course Selection', screen: 'CourseSelection' },
    { label: 'Invigilator Scan ID', screen: 'InvigilatorScan' },
    { label: 'Attendance', screen: 'Attendance' },
    { label: 'Exam Stats', screen: 'ExamStats' },
    { label: 'Help', screen: 'Help' },
  ];

  return (
    <View style={styles.container}>
      {/* Header with menu icon, title, and logout button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>MENU</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={() => onMenuItemPress('Logout')}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable list of menu items */}
      <ScrollView style={styles.scrollContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuCard}
            onPress={() => onMenuItemPress(item.screen)}
          >
            <Text style={styles.menuTextItem}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Light gray background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3B82F6', // Blue header background
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
  scrollContainer: {
    flex: 1,
  },
  menuCard: {
    margin: 16,
    backgroundColor: '#FFFFFF', // White card background
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6', // Blue left border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Shadow for Android
  },
  menuTextItem: {
    color: '#3B82F6',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Menu;

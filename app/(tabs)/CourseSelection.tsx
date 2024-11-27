import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CourseSelection: React.FC = () => {
  const navigation = useNavigation();

  const courses = [
    { code: 'COM 311', title: 'Software Engineering', date: '16-12-2024', time: '8:00 AM - 10:00 AM', venue: 'CHIKOWI LECTURE' },
    { code: 'EDF 311', title: 'Introduction Education', date: '16-12-2024', time: '8:00 AM - 10:00 AM', venue: 'CHIKOWI LECTURE' },
    { code: 'COM 312', title: 'Human Computer Interaction', date: '17-12-2024', time: '8:00 AM - 10:00 AM', venue: 'MWAMBO LECTURE' },
    { code: 'COM 313', title: 'Computer Security', date: '14-12-2024', time: '8:00 AM - 10:00 AM', venue: 'WANDONDA LECTURE' },
    { code: 'COM 314', title: 'Data Structure and Algorithms', date: '15-12-2024', time: '8:00 AM - 10:00 AM', venue: 'MWAMBO LECTURE' },
    { code: 'SCE 311', title: 'Education Computer Security', date: '13-12-2024', time: '8:00 AM - 10:00 AM', venue: 'WANDONDA LECTURE' },
    { code: 'INF 311', title: 'Internet Goranve', date: '11-12-2024', time: '9:30 AM - 11:30 AM', venue: 'WANDONDA LECTURE' },
  ];

  // Assuming user login status is tracked here
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', onPress: () => {
          setIsLoggedIn(false); 
          navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }], 
          });
        }},
      ]
    );
  };

  
  useEffect(() => {

    const loggedIn = true; 
    setIsLoggedIn(loggedIn);

    if (!loggedIn) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginScreen' }],
      });
    }
  }, [navigation]);

  if (!isLoggedIn) {
    return null; 
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>COURSE SELECTION</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>
        {courses.map((course, index) => (
          <TouchableOpacity key={index} style={styles.courseCard} onPress={() => console.log(`Selected course: ${course.code}`)}>
            <Text style={styles.courseCode}>{course.code}</Text>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <View style={styles.courseDetailsContainer}>
              <Text style={styles.courseDetails}>📅 {course.date}</Text>
              <Text style={styles.courseDetails}>⏰ {course.time}</Text>
              <Text style={styles.courseDetails}>📍 {course.venue}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
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
    paddingTop: 8,
  },
  courseCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  courseCode: {
    color: '#3B82F6',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  courseTitle: {
    color: '#1F2937',
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
  },
  courseDetailsContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  courseDetails: {
    color: '#6B7280',
    fontSize: 14,
    marginTop: 4,
  },
});

export default CourseSelection;

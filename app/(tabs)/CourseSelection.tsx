import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';

const CourseSelection: React.FC = () => {
  const courses = [
    {
      code: 'COM 311',
      title: 'Software Engineering',
      date: '16-12-2024',
      time: '8:00 AM - 10:00 AM',
      venue: 'CHIKOWI LECTURE',
    },
    {
      code: 'COM 316',
      title: 'Series Assambly',
      date: '16-12-2024',
      time: '8:00 AM - 10:00 AM',
      venue: 'CHIKOWI LECTURE',
    },
    {
      code: 'COM 312',
      title: 'Human Computer Interaction',
      date: '17-12-2024',
      time: '8:00 AM - 10:00 AM',
      venue: 'MWAMBO LECTURE',
    },
    {
      code: 'COM 313',
      title: 'Computer Security',
      date: '14-12-2024',
      time: '8:00 AM - 10:00 AM',
      venue: 'WANDONDA LECTURE',
    },
    {
      code: 'COM 314',
      title: 'Data Structure and Algorithms',
      date: '15-12-2024',
      time: '8:00 AM - 10:00 AM',
      venue: 'MWAMBO LECTURE',
    },
    {
      code: 'SCE 311',
      title: 'Education Computer Security',
      date: '13-12-2024',
      time: '8:00 AM - 10:00 AM',
      venue: 'WANDONDA LECTURE',
    },
    {
      code: 'INF 311',
      title: 'Internet Goranve',
      date: '11-12-2024',
      time: '9:30 AM - 11:30 AM',
      venue: 'WANDONDA LECTURE',
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', onPress: () => console.log('Logged Out') },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuIcon}
          onPress={() => console.log('Menu icon pressed')}
        >
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>COURSE SELECTION</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable Course List */}
      <ScrollView style={styles.scrollContainer}>
        {courses.map((course, index) => (
          <TouchableOpacity
            key={index}
            style={styles.courseCard}
            onPress={() => console.log(`Selected course: ${course.code}`)}
            accessibilityLabel={`Course: ${course.title}, scheduled on ${course.date}`}
          >
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
    backgroundColor: '#F3F4F6', // Light gray background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3B82F6', // Blue background
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
    marginHorizontal: 16,
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
    backgroundColor: '#FFFFFF', // White background
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6', // Blue left border
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Android shadow
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

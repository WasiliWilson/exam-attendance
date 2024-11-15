import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const CourseSelection: React.FC = () => {
  const courses = [
    {
      code: 'COM 311',
      title: 'Software Engineering',
      date: '17-12-2024',
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
      date: '13-12-2024',
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
        title: 'EDUCATION COMPUTER SECURITY',
        date: '13-12-2024',
        time: '8:00 AM - 10:00 AM',
        venue: 'WANDONDA LECTURE',
      },
  ];

  return (
    <View style={styles.container}>
      {/* Header with menu icon, title, and logout button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.menuIcon}>
          <Text style={styles.menuText}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>COURSE SELECTION</Text>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable list of courses */}
      <ScrollView style={styles.scrollContainer}>
        {courses.map((course, index) => (
          <TouchableOpacity key={index} style={styles.courseCard}>
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
    </View>
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
  scrollContainer: {
    flex: 1,
  },
  courseCard: {
    margin: 16,
    backgroundColor: '#FFFFFF2',
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
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

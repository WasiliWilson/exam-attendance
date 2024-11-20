import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Menu from './app/(tabs)/Menu';
import CourseSelection from './app/(tabs)/CourseSelection';
import ExamStats from './app/(tabs)/ExamStat';
import Help from './app/(tabs)/Help';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#F3F4F6', // Sidebar background
            width: 250,
          },
          headerStyle: {
            backgroundColor: '#3B82F6', // Top bar background
          },
          headerTintColor: '#FFFFFF', // Top bar text color
        }}
      >
        <Drawer.Screen name="Menu" component={Menu} />
        <Drawer.Screen name="Course Selection" component={CourseSelection} />
        <Drawer.Screen name="Exam Stats" component={ExamStats} />
        <Drawer.Screen name="Help" component={Help} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;

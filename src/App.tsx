import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from '@/app/(tabs)/SignUpScreen';
import LoginScreen from '@/app/(tabs)/LoginScreen';
import Menu from '@/app/(tabs)/Menu';
import Help from '@/app/(tabs)/Help';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Help" component={Help} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

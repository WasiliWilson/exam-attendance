import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

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

      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default App;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './app/(tabs)/Home'
import ScanID from './app/(tabs)/ScanID';

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

      <Drawer.Screen name="Home" component={Home}/>
      <Drawer.Screen name="ScanID" component={ScanID}/>
      </Drawer.Navigator>
      
    </NavigationContainer>
  );
};
export default App;
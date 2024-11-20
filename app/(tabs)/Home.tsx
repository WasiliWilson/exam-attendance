import {View, Button, StyleSheet} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
	ScanID: undefined; // Ensure this route exists
	// Add other routes as needed
  };

export default function Home(){
	// Use navigation hook
	const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
	
	return (
		<View style={styles.container}>
		  <Button
			title="Scan"
			onPress={() => navigation.navigate('ScanID')}
		  />
		</View>
	  );
	}
	
	const styles = StyleSheet.create({
	  container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	  },
	});

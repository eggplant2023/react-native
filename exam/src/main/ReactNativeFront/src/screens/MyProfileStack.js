import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyProfileScreen from './MyProfileScreen';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

function MyProfileStack() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      </Stack.Navigator>
  );
}

export default MyProfileStack;
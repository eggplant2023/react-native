import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyProfileScreen from './MyProfileScreen';
import {useNavigation, useIsFocused} from '@react-navigation/native';
const Stack = createNativeStackNavigator();

function MyProfileStack({user}) {
  const isFocused = useIsFocused(); // isFoucesd Define
  useEffect(() => {
    //console.log('MyProfileStack props is', user);
  }, [isFocused]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyProfile"
        children={() => {
          return <MyProfileScreen user={user} />;
        }}
      />
    </Stack.Navigator>
  );
}

export default MyProfileStack;
